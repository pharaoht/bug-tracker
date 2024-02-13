const mysql = require('mysql2');

require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASENAME = process.env.DATABASENAME;
const DATABASEPASSWORD = process.env.DATABASEPASSWORD;

const pool = mysql.createPool({
    host: HOST,
    user:USER,
    database: DATABASENAME,
    password:DATABASEPASSWORD,
});

module.exports = pool.promise();