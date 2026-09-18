const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'cultural_fest_voting'
});

pool.query('SELECT 1', (err, results) => {
    if (err) {
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('Valid password, but DB does not exist');
        } else {
            console.error('Connection failed:', err.message);
        }
    } else {
        console.log('Connection successful!', results);
    }
    process.exit();
});
