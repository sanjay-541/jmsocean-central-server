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
        const res = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'plan_board'
      ORDER BY ordinal_position
    `);
        console.log(res.rows.map(r => r.column_name).join(', '));

        const typeRes = await pool.query(`
      SELECT table_type 
      FROM information_schema.tables 
      WHERE table_name = 'plan_board'
    `);
        console.log('Table Type:', typeRes.rows[0]?.table_type);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

debug();
