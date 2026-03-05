const { Client } = require('pg');

const c = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jpsms',
    password: 'Sanjay@541##',
    port: 5433
});

c.connect()
    .then(() => c.query(`
    ALTER TABLE bom_master
    ADD COLUMN IF NOT EXISTS item_id TEXT,
    ADD COLUMN IF NOT EXISTS bom_item_type TEXT,
    ADD COLUMN IF NOT EXISTS bom_item_code TEXT,
    ADD COLUMN IF NOT EXISTS bom_item_name TEXT,
    ADD COLUMN IF NOT EXISTS bom_item_weight_in_kgs NUMERIC,
    ADD COLUMN IF NOT EXISTS bom_uom TEXT,
    ADD COLUMN IF NOT EXISTS bom_type TEXT,
    ADD COLUMN IF NOT EXISTS bom_quantity NUMERIC,
    ADD COLUMN IF NOT EXISTS rm_item_type TEXT,
    ADD COLUMN IF NOT EXISTS rm_item_code TEXT,
    ADD COLUMN IF NOT EXISTS rm_item_name_process TEXT,
    ADD COLUMN IF NOT EXISTS rm_sr_no TEXT,
    ADD COLUMN IF NOT EXISTS rm_item_weight_in_kgs NUMERIC,
    ADD COLUMN IF NOT EXISTS rm_item_uom TEXT,
    ADD COLUMN IF NOT EXISTS rm_item_quantity NUMERIC,
    ADD COLUMN IF NOT EXISTS has_bom TEXT,
    ADD COLUMN IF NOT EXISTS grinding_item_code TEXT,
    ADD COLUMN IF NOT EXISTS grinding_item_name TEXT,
    ADD COLUMN IF NOT EXISTS grinding_percentage NUMERIC,
    ADD COLUMN IF NOT EXISTS alt_items TEXT;
  `))
    .then(() => console.log('Successfully added missing columns to bom_master!'))
    .catch(console.error)
    .finally(() => c.end());
