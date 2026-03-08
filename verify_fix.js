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
        const plant = 'DUNGRA';
        const factoryId = 1;
        const date = '2026-03-08'; // Today's simulated date

        // Simulated query logic from server.js
        const params = [plant, factoryId, date];
        const sql = `
      SELECT id, plan_id, status, start_date 
      FROM plan_board pb
      WHERE plant = $1 
        AND pb.status != 'COMPLETED'
        AND pb.factory_id = $2
        AND (start_date <= $3 OR status = 'PLANNED') 
        AND (end_date IS NULL OR end_date >= $3)
      ORDER BY pb.start_date ASC
    `;

        const res = await pool.query(sql, params);
        console.log(`Found ${res.rowCount} plans for ${plant} on ${date}:`);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

run();
