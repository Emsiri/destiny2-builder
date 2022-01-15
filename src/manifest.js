// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'
const dbName = 'world_sql_content_3d029e66883b2c5765b6e4848f1c2965.db'
// const query = `SELECT json FROM DestinyInventoryItemDefinition WHERE id = -226702489`

// export function openDB() {
//   let db = new sqlite3.Database(`./db/${dbName}`, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log(`Connected to manifest`)
//   })
//   return db
// }
export async function openDb () {
  return open({
    filename: `./db/${dbName}`,
    driver: sqlite3.Database
  })
}



export async function queryManifest(db, table, id) {
  
  const query = `SELECT json FROM ${table} WHERE id = ${id}`

  const result = await db.get(query)
  return result
}

export async function closeDB(db) {
  await db.close()
}
