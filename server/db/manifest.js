import sqlite3 from "sqlite3";
import { open } from "sqlite";
const dbName = "world_sql_content_4c97503460963fcd2ce43e97c372be87.sqlite3";

export async function openDb() {
  return open({
    filename: `../db/${dbName}`,
    driver: sqlite3.Database,
  });
}

export async function queryManifest(db, table, id) {
  const query = `SELECT json FROM ${table} WHERE id = ${id}`;

  const result = await db.get(query);
  return result;
}

export async function closeDB(db) {
  await db.close();
}
