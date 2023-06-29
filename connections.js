const mysql = require("mysql2")

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'positions_db'
  },
  console.log(`Connected to the positions_db database.`)
);

module.exports = db