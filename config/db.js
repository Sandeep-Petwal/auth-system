const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DB_URL,
});

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

module.exports = pool;