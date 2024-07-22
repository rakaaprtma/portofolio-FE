const mysql = require('mysql');

const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_data',
  charset: 'utf8mb4',
  timezone: '+07:00'
});

conn.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = conn;
