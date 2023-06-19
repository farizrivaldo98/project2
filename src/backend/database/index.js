require("dotenv").config();
const mysql = require("mysql2");
const util = require("util");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE1,
  port: process.env.DB_PORT,
});

const db2 = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE2,
  port: process.env.DB_PORT,
});

// host: "10.126.15.124",
// user: "root",
// password: "s4k4f4rmA",
// database: "parammachine_saka",
// port: 3306,

// host: "10.126.15.138",
// user: "ems_saka",
// password: "s4k4f4rmA",
// database: "parammachine_saka",
// port: 3306,

db.connect((err) => {
  if (err) {
    return console.log(`error : ${err.message}`);
  }
  console.log("connect to mysql");
});

db2.connect((err) => {
  if (err) {
    return console.log(`error : ${err.message}`);
  }
  console.log("connect to mysql2");
});

const query = util.promisify(db.query).bind(db);
const query2 = util.promisify(db2.query).bind(db2);

module.exports = { db2, db, query };
