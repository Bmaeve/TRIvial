const { Pool } = require('pg')

let host;
if (process.env.HOST == undefined) {
    host = 'db'
} else {
    host = process.env.host
}

const pool = new Pool({
    host: host,
    user: 'postgres',
    password: 'postgresql',
    database: 'open_data'
})

module.exports = pool;