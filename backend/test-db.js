const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'cultural_fest_voting'
});

pool.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Connection successful!', results);
    }
    process.exit();
});
