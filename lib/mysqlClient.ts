import mysql, { Connection } from "mysql2/promise";
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

export async function executeQuery(sql: string, values?: string[]) {
  const db = await createConnection();
  try {
    const [result] = await db.query(sql, values || []);
    return result;
  } finally {
    await db.end();
  }
}
