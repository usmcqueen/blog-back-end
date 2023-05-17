import { createConnection } from "mysql2";
// const { createConnection } = require("mysql2");


export const db = createConnection({
 host: "localhost",
 user: "root",
 password: "root",
 database: "blog",
 port: 3306,
});


db.connect((error) => {
 if (error) throw error
 console.log("Connection was established");
});


// db.query('SELECT * FROM posts', (err, rows, fields) => {
//   if (err) throw err
//   console.log('query result: ', rows[0])
// })


export default db;


