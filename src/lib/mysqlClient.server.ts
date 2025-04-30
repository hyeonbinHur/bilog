import mysql, {
  Connection,
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import fs from "fs";
import { Client } from "ssh2";

export type QueryConfig = {
  sql: string;
  values: any[];
};

export type QueryResult<T> = [T[], FieldPacket[]];

export interface CustomRowDataPacket extends RowDataPacket {
  totalCount?: number;
}

let connection: Connection | null = null;

export const createConnection = async (): Promise<Connection> => {
  if (connection) return connection;

  // SSH 설정
  const sshConfig = {
    host: process.env.SSH_HOST!,
    port: parseInt(process.env.SSH_PORT || "22"),
    username: process.env.SSH_USERNAME!,
    privateKey: fs.readFileSync(process.env.SSH_PRIVATE_KEY_PATH!),
  };

  // MySQL 설정
  const dbConfig = {
    host: "127.0.0.1", // SSH 터널을 통해 로컬로 접속
    port: 3307, // 아래에서 할당받는 포트와 일치해야 함
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // SSH 터널링
  return new Promise<Connection>((resolve, reject) => {
    const ssh = new Client();
    ssh.on("ready", () => {
      ssh.forwardOut(
        "127.0.0.1",
        0,
        process.env.DB_HOST!,
        parseInt(process.env.DB_PORT || "3306"),
        async (err, stream) => {
          if (err) {
            ssh.end();
            return reject(err);
          }
          try {
            const conn = await mysql.createConnection({
              ...dbConfig,
              stream,
            });
            connection = conn;
            resolve(conn);
          } catch (dbErr) {
            reject(dbErr);
          }
        }
      );
    });
    ssh.on("error", reject);
    ssh.connect(sshConfig);
  });
};

export async function executeQuery(sql: string, values?: (string | number)[]) {
  const db = await createConnection();
  try {
    const [result] = await db.query(sql, values || []);
    return result as ResultSetHeader;
  } catch (err) {
    connection = null;
    throw err;
  }
}

export async function executeQueries<T extends RowDataPacket>(
  connection: Connection,
  queries: QueryConfig[]
): Promise<QueryResult<T>[]> {
  return Promise.all(
    queries.map(({ sql, values }) => connection.query<T[]>(sql, values))
  );
}
