require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'jpsms',
    password: process.env.DB_PASSWORD || 'Sanjay@541##',
    port: process.env.DB_PORT || 5432,
});

async function run() {
    try {
        console.log('--- Backfilling factory_id for plan_board ---');
        const res = await pool.query(`
      UPDATE plan_board 
      SET factory_id = 1 
      WHERE factory_id IS NULL
    `);
        console.log(`Updated ${res.rowCount} rows.`);

        // Also check orders just in case
        const resOrders = await pool.query(`
      UPDATE orders 
      SET factory_id = 1 
      WHERE factory_id IS NULL
    `);
        console.log(`Updated ${resOrders.rowCount} orders.`);

    } catch (err) {
        console.error('Error during backfill:', err);
    } finally {
        await pool.end();
    }
}

run();
