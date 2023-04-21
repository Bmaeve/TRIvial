const { exec } = require("child_process");
let utils = require('./utils');
const path = require('node:path');
let poolBuilder = require('./poolPg');
let fs = require('fs')
let { parse } = require('csv-parse');
const csv = require('csv-parser');

let importData = {
    /*
    module made for importing different type of data for TRI case
    */

    async importFiness(database, table_name, inPath, columns = undefined, removeIfExists = true) {
        /*
        imports finess data from a csv file
        because of its particular structure, lines must be imported one by one

        - database : name of the database where the data will  be created
        - table_name : name of the table where the data will  be created
        - inPath : path toward the csv file
        - columns : columns of the table with their type, they are specified in parameters/finessColumns.json file
        - removeIfExists : if true, drop the table if it already exists
        */

        // initializing pool
        let pool = poolBuilder.getPool(database)

        // remove table if needed
        if (await utils.tableExists(pool, table_name) && removeIfExists) {
            await utils.dropTable(pool, table_name)
        }
        await utils.createTable(pool, table_name, columns)

        let promises = [];
        fs.createReadStream(inPath)
            .pipe(parse({
                delimiter: ';',
                from_line: 1,
                columns: Object.keys(columns),
                relax_column_count: true,
                skip_empty_lines: true
            }))
            .on('data', (data) => {
                if (data.structureet == "structureet") {
                    let query = "INSERT INTO " + table_name + " VALUES ('"
                    Object.keys(data).forEach(column => {
                        value = data[column].replaceAll("'", "\\''");
                        query += value + "','";
                    })
                    query = query.slice(0, -2) + ')';

                    return promise = pool.query(query)
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
    },

    async importMenjva(database, table_name, inPath, removeIfExists = true) {
        /*
        imports menjva data from a csv file
        data can be imported by a single SQL request

        - database : name of the database where the data will  be created
        - table_name : name of the table where the data will  be created
        - inPath : path toward the csv file
        - removeIfExists : if true, drop the table if it already exists
        */

        // initializing pool
        let pool = poolBuilder.getPool(database)

        // remove table if needed
        if (await utils.tableExists(pool, table_name) && removeIfExists) {
            await utils.dropTable(pool, table_name)
        }
        await utils.createTable(pool, table_name, columns)

        // getting columns with a query on csv file
        let columns = await new Promise(function (resolve, reject) {
            fs.createReadStream(inPath)
                .pipe(csv())
                .on('headers', (headers) => {
                    let columnJson = {}
                    let columnsArray = headers[0].split(";")
                    columnsArray.forEach(column => {
                        let column_sql = column
                            .replaceAll(" ", "_")
                            .replaceAll("'", "")
                            .replaceAll("/", "_")
                            .normalize("NFD")
                            .replaceAll(/\p{Diacritic}/gu, "")
                            .toLowerCase()
                        columnJson[column_sql] = "varchar"
                    })
                    resolve(columnJson)
                })
                .on('error', reject)
        })

        // init query
        let query = "COPY " + table_name + "(";
        Object.keys(columns).forEach(column => {
            query += column + ","
        })
        query = query.slice(0, -1) + ')';
        query += " \
            FROM '" + path.join(__dirname, inPath) + "' \
            DELIMITER ';' \
            HEADER CSV \
        ";

        // launching promise
        return promise = pool.query(query)
            .then(() => {
                console.log("done")
            })
            .catch((err) => {
                console.log(err)
            })

    },

    async importSHP(database, inPath, removeIfExists = true) {
        /*
        imports data from a shp file
        shp2pgsql is the module used for this task

        - database : name of the database where the data will  be created
        - inPath : path toward the shp file
        - removeIfExists : if true, drop the table if it already exists
        */

        // initializing pool
        let pool = poolBuilder.getPool(database)

        // remove table if needed
        let table_name = path.basename(inPath, '.shp').toLowerCase()
        if (await utils.tableExists(pool, table_name) && removeIfExists) {
            await utils.dropTable(pool, table_name)
        }
        await utils.createTable(pool, table_name, columns)

        let command = "shp2pgsql -s 2154 " + inPath + "  | psql --host " + pool.options.host + " --username=" + pool.options.user + " " + pool.options.database
        exec(command, { maxBuffer: 1024 * 1024 * 500 }, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

    },

    async importSHPDirectory(database, dirPath, removeIfExists = true) {
        /*
        imports data from every shp file in a given directory 
        shp2pgsql is the module used for this task

        - database : name of the database where the data will  be created
        - dirPath : path toward the directory to import
        - removeIfExists : if true, drop the table if it already exists
        */

        // initializing pool
        let pool = poolBuilder.getPool(database)

        // remove table if needed
        if (await utils.tableExists(pool, table_name) && removeIfExists) {
            await utils.dropTable(pool, table_name)
        }
        await utils.createTable(pool, table_name, columns)

        // import each shp file in directory         
        let promises = []
        fs.readdirSync(path.join(__dirname, dirPath))
            .forEach(file => {
                if (path.extname(file).toLowerCase() == ".shp") {
                    let promise = this.importSHP(pool, path.join(__dirname, dirPath, file))
                    promises.push(promise)
                }
            });

        let promise = Promise.all(promises)
            .then(console.log("done"))

        return promise
    }
}


module.exports = importData;