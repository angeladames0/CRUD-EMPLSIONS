const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgre',
  host: 'localhost',
  database: 'APP',
  password: '12345',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
