const { Client } = require('pg');

const c = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jpsms',
    password: 'Sanjay@541##',
    port: 5433
});

c.connect()
    .then(() => c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'bom_master';"))
    .then(res => {
        console.log('Columns for bom_master:');
        res.rows.forEach(r => console.log(r.column_name));
    })
    .catch(console.error)
    .finally(() => c.end());
