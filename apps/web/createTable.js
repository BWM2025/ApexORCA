const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  connectionString: 'postgresql://postgres.mrekdxgfabzobbcgtety:Vwg8AriH2Tc933Kv@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('us-east-1-bundle.pem').toString()
  }
});

async function main() {
  try {
    await client.connect();
    console.log('Connected');

    const res = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'purchases');");
    const exists = res.rows[0].exists;
    console.log('Table exists:', exists);

    if (!exists) {
      await client.query(`
        CREATE TABLE purchases (
          id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
          user_id uuid NOT NULL,
          stripe_id text NOT NULL,
          amount numeric NOT NULL,
          currency text NOT NULL,
          status text NOT NULL,
          created_at timestamp with time zone DEFAULT now()
        );
      `);
      console.log('Table created');
    } else {
      console.log('Table already exists');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
