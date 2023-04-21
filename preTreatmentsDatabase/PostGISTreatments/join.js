let utils = require('./utils');
const path = require('node:path');
let poolBuilder = require('./poolPg');

let join = {
    /*
    moudle made for joining tables 
    */

    async addColumnsOnJoin(database, leftTable, rightTable, rightcolumnsToAdd, leftId = "id_si_ext", rightId = "id") {
        /*
        join left and right table and add choosen columns to the left table from a common ids

        - database : name of the database where are the two tables
        - leftTable : name of the left table to join
        - rightTable : name of the right table to join
        - rightcolumnsToAdd : columns of the right table to add, with their type
        - leftId : id for joining left table
        - rightId : id for joining right table
        */

        let pool = poolBuilder.getPool(database);

        // for each column to add, making a query
        for (let key_idx = 0; key_idx < Object.keys(rightcolumnsToAdd).length; key_idx++) {
            let column = Object.keys(rightcolumnsToAdd)[key_idx]

            let newColumnName = (rightTable + "_" + column).toLowerCase()

            // drop column if already exists
            let currentColumns = await utils.getColumns(pool, leftTable)
            if (currentColumns.includes(newColumnName)) {
                await utils.dropColumn(pool, leftTable, newColumnName)
            }

            // create column
            await utils.createColumn(pool, leftTable, newColumnName, rightcolumnsToAdd[column])

            // writing query
            let query = " \
                        UPDATE " + leftTable + " \
                        SET " + newColumnName + " = rt. " + column + " \
                        FROM " + leftTable + " AS lt \
                        LEFT JOIN " + rightTable + " AS rt \
                        ON lt." + leftId + "=rt." + rightId + " \
                        "

            // sending promise
            await pool.query(query)
                .catch((err) => {
                    if (err.code == '40P01') {
                        console.log(err)
                    }
                })
        }

        console.log("done")
    },

    async intersectGeom(database, newTable, leftTable, rightTable, rightcolumnsToAdd, removeIfExists = true) {
        /*
        join left and right table to a new table from an intersection on geometries

        - database : name of the database where are the two tables
        - newTable : name of new table which will be created
        - leftTable : name of the left table to join
        - rightTable : name of the right table to join
        - rightcolumnsToAdd : columns of the right table to add, with their type
        - removeIfExists : if true, drop the table if it already exists
        */

        // defining pool
        let pool = poolBuilder.getPool(database);

        // drop table if already exists
        if (await utils.tableExists(pool, newTableName) && removeIfExists) {
            await utils.dropTable(pool, newTableName)
        }

        // init query
        let query = " \
                CREATE TABLE " + newTable + " \
                AS \
                SELECT lt.*, \
                "

        // for each column to add, adding to the query
        // SELECT lt.*, result.geom AS...
        let addToqueryIntoJoin = ""
        for (let key_idx = 0; key_idx < Object.keys(rightcolumnsToAdd).length; key_idx++) {
            let column = Object.keys(rightcolumnsToAdd)[key_idx]
            let newColumnName = (rightTable + "_" + column).toLowerCase()
            query += "result." + column + " AS " + newColumnName + ", ";
            addToqueryIntoJoin += column + ","
        }

        // completing query 
        query = query.slice(0, -2)
        query += " \
            FROM " + leftTable + " as lt \
            JOIN LATERAL ( \
            SELECT \
            " + addToqueryIntoJoin.slice(0, -1) + " \
            FROM " + rightTable + " AS rt \
            WHERE ST_DWithin(rt.geom, lt.geom, 1000) \
            AND ST_GeometryType(rt.geom) = 'ST_MultiPolygon' \
            ORDER BY ST_Distance(rt.geom, lt.geom) \
            LIMIT 1 \
            ) AS result \
            ON true; \
        "

        // sending promise
        await pool.query(query)
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })

        console.log("done")
    }

}

module.exports = join;
