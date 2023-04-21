let poolBuilder = require('./poolPg');
const { exec } = require("child_process");

let utils = {
    /*
    module to expose many useful functions for simple database managing
    */

    getAvailableTables(pool) {
        /*
        returns every available table of a database

        - pool : pool for accessing database 
        */

        // init query
        let query = " \
            SELECT table_name \
            FROM information_schema.tables \
            WHERE table_schema='public' \
            AND table_type='BASE TABLE' \
            AND table_name!='spatial_ref_sys' \
            ";

        // sending promise and getting response
        let result_array = [];
        let promise = pool.query(query)
            .then(results => {
                results.rows.forEach(row => {
                    result_array.push(row.table_name)
                });
                return result_array
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    getColumns(pool, table_name) {
        /*
        returns every columns of the given table

        - pool : pool for accessing database 
        - table_name : name of the table 
        */

        // init query
        let query = " \
            SELECT COLUMN_NAME \
            FROM INFORMATION_SCHEMA.COLUMNS \
            WHERE \
            TABLE_SCHEMA = 'public' AND \
            TABLE_NAME   = '" + table_name + "' \
            ";

        // sending promise and getting response
        let result_array = [];
        let promise = pool.query(query)
            .then(results => {
                results.rows.forEach(row => {
                    result_array.push(row.column_name)
                });
                return result_array
            })
            .catch((err) => {
                console.log(err)
            })

        return promise

    },

    getColumnsAndType(pool, table_name) {
        /*
        returns every columns of the given table with their type in json  format
        response template :
        {
            nature: "varchar",
            id: "integer"
        }

        - pool : pool for accessing database 
        - table_name : name of the table 
        */

        // init query
        let query = " \
            SELECT COLUMN_NAME, DATA_TYPE \
            FROM INFORMATION_SCHEMA.COLUMNS \
            WHERE \
            TABLE_SCHEMA = 'public' AND \
            TABLE_NAME   = '" + table_name + "' \
            ";

        // sending promise and getting response
        let result_json = {};
        let promise = pool.query(query)
            .then(results => {
                results.rows.forEach(row => {
                    result_json[row.column_name] = row.data_type
                });
                return result_json
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    createColumn(pool, table_name, column_name, column_type) {
        /*
        create a column in the given table

        - pool : pool for accessing database 
        - table_name : name of the table 
        - column_name : name of the new column 
        - column_type : type of the new column 
        */

        // init query
        let query = "ALTER TABLE " + table_name + " ADD " + column_name + " " + column_type + ";";

        // sending promise and getting response
        let promise = pool.query(query)
            .then(results => {
                console.log("column " + column_name + " created")
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    dropColumn(pool, table_name, column_name) {
        /*
        drop a column in the given table

        - pool : pool for accessing database 
        - table_name : name of the table 
        - column_name : name of the column to drop
        */

        // init query
        let query = "ALTER TABLE " + table_name + " DROP COLUMN " + column_name + ";";

        // sending promise and getting response
        let promise = pool.query(query)
            .then(results => {
                console.log("column " + column_name + " created")
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    renameColumn(database, table_name, column_name, new_column_name) {
        /*
        rename a column in the given table

        - database : database name 
        - table_name : name of the table 
        - column_name : previous name of the column 
        - new_column_name : new name of the column 
        */

        let pool = poolBuilder.getPool(database)

        // init query
        let query = "ALTER TABLE " + table_name + " RENAME COLUMN " + column_name + " to " + new_column_name + ";"

        // sending promise and getting response
        let promise = pool.query(query)
            .then(results => {
                console.log("column " + column_name + " renamed " + new_column_name)
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    tableExists(pool, table_name) {
        /*
        checks if a table exists in a database

        - pool : pool for accessing database 
        - table_name : name of the table 
        */

        // init query
        let query = " \
            SELECT 1 \
            FROM information_schema.tables  \
            WHERE table_type='BASE TABLE'  \
            AND table_name='" + table_name.toLowerCase() + "' \
        "

        // sending promise and getting response
        let promise = pool.query(query)
            .then(results => {
                return (results.rows.length === 1);
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    createTable(pool, table_name, columns) {
        /*
        create table in a given database

        - pool : pool for accessing database 
        - table_name : name of the table to create
        - columns : columns of the table to create, with their type
        */

        // init query
        let query = 'CREATE TABLE ' + table_name + '(\n'
        Object.keys(columns).forEach(column => {
            query += column + " " + columns[column] + ",\n"
        })
        query = query.slice(0, -2) + ');\n\n';

        // sending promise and getting response
        let promise = pool.query(query)
            .then(results => {
                console.log("table " + table_name + " created")
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    dropTable(pool, table_name) {
        /*
        drop table in a given database

        - pool : pool for accessing database 
        - table_name : name of the table to drop
        */

        // init query
        let query = "DROP TABLE " + table_name + ";"

        // sending promise and getting response
        let promise = pool.query(query)
            .then(results => {
                console.log("table " + table_name + " removed")
            })
            .catch((err) => {
                console.log(err)
            })

        return promise
    },

    async copyTable(table_name, srcDB, trgDB, removeIfExists = true) {
        /*
        copy the table from a given database toward an other
        the commands pg_dump and psql are used

        - table_name : name of the table to copy
        - srcDB : name of the source database
        - trgDB : name of the target database
        - removeIfExists : if true, drop the table in the target database if it already exists
        */

        // getting pool
        let tgPool = poolBuilder.getPool(trgDB);

        // drop table if already exists
        if (await utils.tableExists(tgPool, table_name) && removeIfExists) {
            await utils.dropTable(tgPool, table_name)
        }

        // command init
        let command = " \
            pg_dump \
            --host " + tgPool.options.host + " \
            --encoding=utf8 \
            --no-owner \
            --username=" + tgPool.options.user + " \
            -t " + table_name + " \
            " + srcDB + " \
            | psql \
            --host " + tgPool.options.host + " \
            --username=" + tgPool.options.user + " \
            " + trgDB

        // execute command
        let promise = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log('done');
        });

        return promise;
    }
}

module.exports = utils;