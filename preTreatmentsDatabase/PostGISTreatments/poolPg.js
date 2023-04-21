const { Pool } = require('pg')

let poolBuilder = {
    /*
    module to build the pool for accessing database
    */

    getPool(database) {
        const pool = new Pool({
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: database
        })

        return pool
    }
}


module.exports = poolBuilder;