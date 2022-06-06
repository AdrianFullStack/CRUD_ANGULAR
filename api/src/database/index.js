const mysql = require('mysql2');

const db_connection = mysql.createPool({
    host: 'localhost',
    port: '3000',
    user: 'root',
    password: '12345678',
    database: 'crud',
});

module.exports = db_connection
