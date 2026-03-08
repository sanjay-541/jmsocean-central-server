require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'jpsms',
    password: process.env.DB_PASSWORD || 'Sanjay@541##',
    port: process.env.DB_PORT || 5432,
});

async function debug() {
    try {
        const res = await pool.query('SELECT plan_id, plant, factory_id, status FROM plan_board ORDER BY updated_at DESC LIMIT 50');
        fs.writeFileSync('pb_data.json', JSON.stringify(res.rows, null, 2));
        console.log('Data written to pb_data.json');
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

debug();
