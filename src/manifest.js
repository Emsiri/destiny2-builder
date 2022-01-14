// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
const dbName = 'world_sql_content_3d029e66883b2c5765b6e4848f1c2965.db'
// const query = `SELECT json FROM DestinyInventoryItemDefinition WHERE id = -226702489`

export function openDB() {
  let db = new sqlite3.Database(`./db/${dbName}`, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log(err)
    }
    console.log(`Connected to manifest`)
  })
  return db
}


export function queryManifest(db, table, id) {
  
  const query = `SELECT json FROM ${table} WHERE id = ${id}`

  db.get(query, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(JSON.parse(row.json));
    // return row
    // ? console.log(row.id, row.name)
    // : console.log(`No playlist found with the id ${id}`);
  });

  
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   // console.log('Close the database connection.');
  // });
}

export function closeDB(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
