// import mysql from "mysql2/promise";


// import mysql from "mysql2"
const mysql = require("mysql2");




// const { createConnection } = require("mysql2");
const dotenv = require("dotenv");
// import dotenv from 'dotenv';
dotenv.config(); 

const accessToken = process.env.ACCESS_TOKEN; // Access the value of ACCESS_TOKEN from the environment

// get the client
// const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

module.exports = pool
//  export default pool;



// pool.getConnection((error, _connection) => {
//     if (error)
//     throw error;
//     console.log('Database connected successfully');
//     pool.releaseConnection(conn);
//  })


// export const db = createConnection({
//  host: process.env.HOST,
//  user: process.env.USER_NAME,
//  password: process.env.PASSWORD,
//  database: process.env.DATABASE,
//  port: 3306,
//  accessToken: process.env.ACCESS_TOKEN,
// });



// db.connect((error) => {
//  if (error) throw error
//  console.log("Connection was established");
// });

// export default db;


