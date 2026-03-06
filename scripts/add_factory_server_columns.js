require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5433,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Sanjay@541##',
    database: process.env.DB_NAME || 'jpsms'
});

async function run() {
    const client = await pool.connect();
    try {
        console.log('Adding Local Server columns to factories table...');
        await client.query(`ALTER TABLE factories ADD COLUMN IF NOT EXISTS server_ip VARCHAR(255)`);
        await client.query(`ALTER TABLE factories ADD COLUMN IF NOT EXISTS sync_api_key VARCHAR(255)`);
        await client.query(`ALTER TABLE factories ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMPTZ`);
        console.log('[OK] Altered factories schema.');
    } catch (err) {
        console.error('[ERROR]', err);
    } finally {
        client.release();
        pool.end();
    }
}

run();
