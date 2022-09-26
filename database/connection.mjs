import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

export default db;