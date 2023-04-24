let pool = require('../routes/poolPg');
let enjeux = require('../parameters/enjeux.json')

function getTypesEnjeux() {
    /*
    return every types of enjeux which are available
    */

    let result_array = [];
    let promises = [];

    Object.keys(enjeux).forEach((enjeu) => {

        //SQL request
        var query = " \
        SELECT COLUMN_NAME, DATA_TYPE \
        FROM INFORMATION_SCHEMA.COLUMNS \
        WHERE TABLE_NAME = '" + enjeu + "' \
        ";

        try {
            for (let i = 0; i < enjeux[enjeu].columnsToKeep.length; i++) {
                let columnToKeep = enjeux[enjeu].columnsToKeep[i];
                if (i == 0) {
                    query += " AND ( COLUMN_NAME = '" + columnToKeep + "'";
                }
                if (i == enjeux[enjeu].columnsToKeep.length - 1) {
                    query += "OR COLUMN_NAME = '" + columnToKeep + "');"
                } else {
                    query += "OR COLUMN_NAME = '" + columnToKeep + "'";
                }
            }
        } catch (e) {
            //pass 
        }

        // send and retrieve data
        let enjeuPromise = pool.query(query)
            .then((results) => {
                var features = []
                // build the features data lists
                results.rows.forEach(element => {
                    features.push({
                        column_name: element.column_name,
                        data_type: element.data_type
                    })
                })

                if (features.length != 0) {
                    result_array.push({
                        key: enjeu,
                        fullName: enjeux[enjeu].full_name,
                        columns: features
                    })
                }
            })

        promises.push(enjeuPromise);
    })

    // returns promise
    return Promise.all(promises)
        .then(() => {
            return result_array;
        })
}

module.exports = getTypesEnjeux;