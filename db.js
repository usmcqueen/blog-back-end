import { createConnection } from "mysql2";
// const { createConnection } = require("mysql2");
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// const accessToken = process.env.ACCESS_TOKEN; // Access the value of ACCESS_TOKEN from the environment

export const db = createConnection({
 host: process.env.HOST,
 user: process.env.USER_NAME,
 password: process.env.PASSWORD,
 database: process.env.DATABASE,
//  port: 3306,
//  accessToken: accessToken,
});

db.connect((error) => {
 if (error) throw error
 console.log("Connection was established");
});

export default db;


