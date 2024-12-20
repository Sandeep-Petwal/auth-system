const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_URL,
    max: 10,
    keepAlive: true,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));



const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.query(createUserTable)
    .then(() => console.log('Users table created'))
    .catch(err => console.error('Error creating users table:', err));

module.exports = pool;