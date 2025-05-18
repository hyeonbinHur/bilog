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
  Connection,
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

export type QueryConfig = {
  sql: string;
  values: any[];
};

export type QueryResult<T> = [T[], FieldPacket[]];

export declare interface CustomRowDataPacket extends RowDataPacket {
  totalCount?: number; // 추가 필드
}

export const createConnection = async () => {
  const connection: Connection = await mysql.createConnection({
    host: process.env.DB_HOST_DIR,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // 동시에 최대 10개의 연결 유지
    queueLimit: 0,
  });
  return connection;
};

export async function executeQuery(sql: string, values?: (string | number)[]) {
  const db = await createConnection();
  try {
    const [result] = await db.query(sql, values || []);
    return result as ResultSetHeader;
  } finally {
    await db.end();
  }
}

export async function executeQueries<T extends RowDataPacket>(
  queries: QueryConfig[]
): Promise<QueryResult<T>[]> {
  const connection = await createConnection();

  try {
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
    await connection.end();
  }
}
