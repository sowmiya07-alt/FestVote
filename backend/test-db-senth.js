const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'senth',
    password: '123',
});

pool.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Connection successful!');
    }
    process.exit();
});
