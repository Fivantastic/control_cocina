require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true
});

const sqlFile = path.join(__dirname, 'create-tables.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error creating tables:', err);
            return;
        }
        console.log('Tables created successfully');
        connection.end();
    });
});
