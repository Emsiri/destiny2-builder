import sqlite3 from "sqlite3";
import { open } from "sqlite";
const dbName = "world_sql_content_732816fb253133e093499c7709e9d9be.sqlite3";

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
