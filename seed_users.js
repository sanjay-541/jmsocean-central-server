const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Sanjay@541##',
    database: process.env.DB_NAME || 'jpsms'
});

async function seedUsers() {
    const client = await pool.connect();
    try {
        console.log('Seeding users...');

        // Admin
        await client.query(`
            INSERT INTO users (username, password, line, role_code, is_active)
            VALUES ('superadmin', 'SM_2025', 'ALL', 'superadmin', true)
            ON CONFLICT (username) DO NOTHING
        `);

        // Planner
        await client.query(`
            INSERT INTO users (username, password, line, role_code, is_active)
            VALUES ('planner', 'planner', 'ALL', 'planner', true)
            ON CONFLICT (username) DO NOTHING
        `);

        // Supervisor
        await client.query(`
            INSERT INTO users (username, password, line, role_code, is_active)
            VALUES ('sup1', 'sup1', '1', 'supervisor', true)
            ON CONFLICT (username) DO NOTHING
        `);

        console.log('Users seeded successfully.');
        console.log('Credentials:');
        console.log('Admin: admin / admin');
        console.log('Planner: planner / planner');
        console.log('Supervisor: sup1 / sup1');

    } catch (err) {
        console.error('Error seeding users:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

seedUsers();
