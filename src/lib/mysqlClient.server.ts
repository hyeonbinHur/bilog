// import mysql, {
//   FieldPacket,
//   ResultSetHeader,
//   RowDataPacket,
// } from "mysql2/promise";
// import { Client } from "ssh2";
// import { Pool } from "mysql2/promise";
// export type QueryConfig = {
//   sql: string;
//   values: any[];
// };
// export type QueryResult<T> = [T[], FieldPacket[]];
// export interface CustomRowDataPacket extends RowDataPacket {
//   totalCount?: number;
// }

// let pool: Pool | null = null;

// export const createPoolOverSSH = async (): Promise<Pool> => {
//   if (pool) return pool;
//   const privateKeyBase64 = process.env.SSH_PRIVATE_KEY_B64!;
//   const privateKeyBuffer = Buffer.from(privateKeyBase64, "base64");
//   const sshConfig = {
//     host: process.env.SSH_HOST!,
//     port: parseInt(process.env.SSH_PORT || "22"),
//     username: process.env.SSH_USERNAME!,
//     privateKey: privateKeyBuffer,
//   };
//   const forwardConfig = {
//     srcHost: "127.0.0.1",
//     srcPort: 0,
//     dstHost: process.env.DB_HOST!,
//     dstPort: parseInt(process.env.DB_PORT || "3306"),
//   };
//   const ssh = new Client();
//   return new Promise<Pool>((resolve, reject) => {
//     ssh.on("ready", () => {
//       ssh.forwardOut(
//         forwardConfig.srcHost,
//         forwardConfig.srcPort,
//         forwardConfig.dstHost,
//         forwardConfig.dstPort,
//         (err, stream) => {
//           if (err) {
//             ssh.end();
//             return reject(err);
//           }
//           // SSH 스트림으로 MySQL Pool 생성
//           pool = mysql.createPool({
//             host: "127.0.0.1",
//             user: process.env.DB_USER!,
//             password: process.env.DB_PASSWORD!,
//             database: process.env.DB_NAME!,
//             stream,
//             waitForConnections: true,
//             connectionLimit: 30,
//             queueLimit: 100,
//             idleTimeout: 60000,
//           });
//           resolve(pool);
//         }
//       );
//     });
//     ssh.on("error", (err) => {
//       reject(err);
//     });
//     ssh.connect(sshConfig);
//   });
// };

// async function getConnectionWithRetry(
//   pool: Pool,
//   retries = 3
// ): Promise<mysql.PoolConnection> {
//   console.error("here");
//   for (let i = 0; i < retries; i++) {
//     try {
//       const conn = await pool.getConnection();
//       return conn;
//     } catch (err: any) {
//       // 재시도 가능한 에러인지 확인
//       if (
//         err.code === "PROTOCOL_CONNECTION_LOST" ||
//         err.code === "ECONNRESET" ||
//         err.code === "ECONNREFUSED"
//       ) {
//         console.warn(`Connection lost, retrying... (${i + 1}/${retries})`);
//         await new Promise((res) => setTimeout(res, 500)); // 잠시 대기 후 재시도
//         continue;
//       }
//       throw err;
//     }
//   }
//   throw new Error("Failed to get DB connection after retries");
// }

// export async function executeQuery(
//   sql: string,
//   values?: (string | number)[]
// ): Promise<ResultSetHeader> {
//   const pool = await createPoolOverSSH();
//   const conn = await getConnectionWithRetry(pool);
//   try {
//     const [result] = await conn.query(sql, values || []);
//     return result as ResultSetHeader;
//   } finally {
//     conn.release();
//   }
// }

// export async function executeQueries<T extends RowDataPacket>(
//   queries: QueryConfig[]
// ): Promise<QueryResult<T>[]> {
//   const pool = await createPoolOverSSH(); // SSH + pool 연결 (네가 정의한 함수)
//   const conn = await getConnectionWithRetry(pool);
//   try {
//     await conn.beginTransaction();
//     // 쿼리들을 순차적으로 실행
//     const results: QueryResult<T>[] = [];
//     for (const { sql, values } of queries) {
//       const result = await conn.query<T[]>(sql, values);
//       results.push(result);
//     }
//     await conn.commit();
//     return results;
//   } catch (err) {
//     await conn.rollback(); // 실패 시 전체 롤백
//     throw err;
//   } finally {
//     conn.release(); // 커넥션 반환 (풀로)
//   }
// }
import mysql, {
  Pool,
  RowDataPacket,
  FieldPacket,
  ResultSetHeader,
} from "mysql2/promise";

// 타입 정의
export type QueryConfig = {
  sql: string;
  values: any[];
};

export type QueryResult<T> = [T[], FieldPacket[]];

export interface CustomRowDataPacket extends RowDataPacket {
  totalCount?: number; // 필요에 따라 확장
}

let pool: Pool | null;

/**
 * 커넥션 풀 반환 (최초 1회 생성, 이후 재사용)
 */
export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST_DIR,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true, // 기본값 false, 명시
      keepAliveInitialDelay: 10000, // 10초마다 ping
      connectTimeout: 10000,
      maxIdle: 5, // 사용되지 않는 커넥션 최대
      idleTimeout: 30000, // 유휴 커넥션 30초 후 종료
    });
  }
  return pool;
};

async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      if (
        error.message.includes("connection is in closed state") ||
        error.code === "PROTOCOL_CONNECTION_LOST"
      ) {
        // 연결이 닫힌 경우 풀을 재생성
        pool = null;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // 지수 백오프
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

/**
 * 단일 쿼리 실행
 */
export async function executeQuery<T extends RowDataPacket[] | ResultSetHeader>(
  sql: string,
  values?: any[]
): Promise<T> {
  return executeWithRetry(async () => {
    const connection = await getPool().getConnection();
    try {
      await connection.ping(); // 🛡️ 커넥션 살아있는지 확인
      const [rows] = await connection.query(sql, values || []);
      return rows as T;
    } finally {
      connection.release();
    }
  });
}
/**
 * 트랜잭션 처리 쿼리 묶음 실행
 */
// executeQueries 함수 수정
export async function executeQueries<T extends RowDataPacket>(
  queries: QueryConfig[]
): Promise<QueryResult<T>[]> {
  return executeWithRetry(async () => {
    const connection = await getPool().getConnection();
    try {
      await connection.ping(); // 🛡️ 커넥션 유효성 확인
      await connection.beginTransaction();
      const results: QueryResult<T>[] = [];
      for (const { sql, values } of queries) {
        const result = await connection.query<T[]>(sql, values);
        results.push(result);
      }
      await connection.commit();
      return results;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  });
}
