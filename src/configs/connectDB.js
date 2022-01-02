import mysql from 'mysql2/promise';

console.log("Creating connection pool ...");

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
});

export default pool;
