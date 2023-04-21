let utils = require('./utils');
const path = require('node:path');
let poolBuilder = require('./poolPg');

let merge = {
    /*
    module made for merging tables
    */

    async mergeTables(database, newTableName, columnsToKeep = undefined, tablesToKeep = undefined, removeIfExists = true) {
        /* 
        merge every selected column of multiple tables into a single table
        if a column isn't present in a table, a NULL value will be attribued

        - database : name of the database where are the tables to merge
        - newTableName : name of the final table
        - columnsToKeep : name of the columns to keep in the final table, with their type
        - tablesToKeep : name of the tables to keep in the final table
        - removeIfExists : if true, drop the table if it already exists
        */

        // defining pool
        let pool = poolBuilder.getPool(database);

        // drop table if already exists
        if (await utils.tableExists(pool, newTableName) && removeIfExists) {
            await utils.dropTable(pool, newTableName)
        }

        // get every tables
        let tables = await utils.getAvailableTables(pool)

        // if tablesToKeep undefined, final table will have every tables of the db
        if (tablesToKeep == undefined) {
            tablesToKeep = tables
        } else if (tablesToKeep.length < 2) {
            console.log("tablesToKeep must have at least a size of 2")
            return false
        }

        // if columnsToKeep undefined, final table will have every existing columns 
        if (columnsToKeep == undefined) {
            columnsToKeep = {}
            for (let i = 0; i < tablesToKeep.length; i++) {
                let tableToKeep = tablesToKeep[i]
                let columns = await utils.getColumnsAndType(pool, tableToKeep)
                Object.keys(columns).forEach(column => {
                    columnsToKeep[column] = columns[column]
                })
            }
        }

        // query init
        let query = "SELECT * INTO " + newTableName + " FROM ( \n";

        // for each table to merge, adding the sub SQL command to the UNION request
        let promises = []
        tables.forEach(table_name => {
            if (tablesToKeep.includes(table_name)) {
                let priority = true;
                let addToquery = "SELECT ";
                let promise = utils.getColumns(pool, table_name)
                    .then(tableColumns => {
                        Object.keys(columnsToKeep).forEach(columnToKeep => {
                            if (tableColumns.includes(columnToKeep)) {
                                addToquery += " " + columnToKeep + ",";
                            } else {
                                addToquery += " Null AS " + columnToKeep + ",";
                                priority = false
                            }
                        })
                        addToquery += " '" + table_name + "' AS " + database + "_source_table ";
                        addToquery += " FROM " + table_name;
                        return {
                            query: addToquery,
                            priority: priority
                        }
                    })
                promises.push(promise)
            }
        })

        // waiting subqueries done
        let result = await Promise.all(promises);

        // finalizing query
        // priority is used for typing the columns in the first UNION
        [true, false].forEach(priority => {
            subQueries = []
            result.forEach((subQuery) => {
                if (subQuery.priority == priority) {
                    subQueries.push(subQuery.query)
                }
            })

            for (let i = 0; i < subQueries.length; i++) {
                query += subQueries[i] + " "
                if ((i == subQueries.length - 1) && priority == false) {
                    query += "\n\n) AS merged"
                } else {
                    query += "\n\nUNION\n\n"
                }
            }
        })

        // sending query
        let promise = pool.query(query)
            .then(() => {
                console.log("done")
            })
            .catch((err) => {
                if (err.code == '42P07') {
                    console.log("table already exists : specify if it should be removed")
                } else {
                    console.log(err)
                }
            })

        return promise
    }

}

module.exports = merge;