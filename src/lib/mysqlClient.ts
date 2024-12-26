import mysql, {
  Connection,
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
export const createConnection = async () => {
  const connection: Connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
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

export type QueryConfig = {
  sql: string;
  values: any[];
};

export type QueryResult<T> = [T[], FieldPacket[]];

export declare interface CustomRowDataPacket extends RowDataPacket {
  totalCount?: number; // 추가 필드
}

export async function executeQueries<T extends RowDataPacket>(
  connection: Connection,
  queries: QueryConfig[]
): Promise<QueryResult<T>[]> {
  return Promise.all(
    queries.map(({ sql, values }) => connection.query<T[]>(sql, values))
  );
}
