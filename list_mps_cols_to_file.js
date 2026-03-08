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
        const res = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'mould_planning_summary'
      ORDER BY ordinal_position
    `);
        const cols = res.rows.map(r => r.column_name).join(', ');
        fs.writeFileSync('mps_cols.txt', cols);
        console.log('Columns written to mps_cols.txt');
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

debug();
