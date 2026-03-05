require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || '123',
    port: process.env.DB_PORT || 5432,
});

async function run() {
    await client.connect();
    try {
        const res = await client.query(`
      SELECT
        tc.table_name AS child_table,
        kcu.column_name AS child_column
      FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name = 'bom_master';
    `);
        console.log("FK Dependencies:", res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
run();
