const mysql = require("mysql2");
const util = require("util");
const db = mysql.createConnection({
  host: "10.126.15.138",
  user: "ems_saka",
  password: "s4k4f4rmA",
  database: "parammachine_saka",
  port: 3306,
});

const db2 = mysql.createConnection({
  host: "10.126.15.138",
  user: "ems_saka",
  password: "s4k4f4rmA",
  database: "ems_saka",
  port: 3306,
});

// host: "10.126.15.83",
// user: "root",
// password: "password",
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
