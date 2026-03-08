require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'jpsms',
    password: process.env.DB_PASSWORD || 'Sanjay@541##',
    port: process.env.DB_PORT || 5432,
});

async function debug() {
    try {
        const res = await pool.query('SELECT * FROM plan_board LIMIT 1');
        console.log('Success:', res.rows.length);
    } catch (err) {
        console.error('--- FULL ERROR START ---');
        console.error(err);
        console.error('--- FULL ERROR END ---');
    } finally {
        await pool.end();
    }
}

debug();
