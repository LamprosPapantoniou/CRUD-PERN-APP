const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '1111',
    host: 'localhost',
    database: 'company'
});

module.exports = pool;
