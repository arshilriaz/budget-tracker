const { Pool } = require('pg');

export const pool = new Pool({
    user: 'username', // your database user
    host: 'localhost',
    database: 'budgetdb', // your database name
    password: 'password', // your database user's password
    port: 5432, // your PostgreSQL server port, 5432 by default
});

module.exports = {
    query: (text:any, params:any) => pool.query(text, params),
};