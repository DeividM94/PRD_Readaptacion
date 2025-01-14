import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Crear el pool de conexiones
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

const promisePool = connection.promise();

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos como ID ' + conn.threadId);
  conn.release();  
});

export default promisePool;