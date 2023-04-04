const { query } = require('express');
let pool = require('../routes/poolPg');
let selectDistinct = require('./selectDistinct')

async function computeRowsConcernedByScenario(table_name_enjeu, table_name_scenario, distinctScenarioColumn) {

    let promises = [];
    let newColumns = [];

    if (distinctScenarioColumn == undefined) {

        let newColumnName = "intersectWith" + table_name_scenario;
        let query = buildQuery(table_name_enjeu, table_name_scenario, newColumnName);
        let promise = pool.query(query)
            .catch((err) => {
                if (err.code == "42701") { // the column already exists : it has already been computed 
                    // pass
                }
            })
        newColumns.push(newColumnName);
        promises.push(promise);

    } else {

        distinctScenarioValues = await selectDistinct(table_name_scenario, distinctScenarioColumn)
        distinctScenarioValues.forEach(value => {
            let filter = {
                column: distinctScenarioColumn,
                value: value
            }
            let newColumnName = "intersectWith_" + table_name_scenario + "_" + value;
            let query = buildQuery(table_name_enjeu, table_name_scenario, newColumnName, filter);
            let promise = pool.query(query)
                .catch((err) => {
                    if (err.code == "42701") { // the column already exists : it has already been computed 
                        // pass
                    }
                })
            newColumns.push(newColumnName);
            promises.push(promise);
        });
    }

    return { promises: promises, newColumns: newColumns };
}

function buildQuery(table_name_enjeu, table_name_scenario, newColumnName, filter = undefined) {
    let query = " \
        ALTER TABLE " + table_name_enjeu + " \
        ADD COLUMN " + newColumnName + " BOOLEAN;\
        \
        UPDATE " + table_name_enjeu + " AS ENJ \
        SET " + newColumnName + " = st_intersects(ENJ.geom, SCE.geom) \
        FROM " + table_name_scenario + " AS SCE \
        WHERE ST_IsValid(ENJ.geom) \
        AND ST_IsValid(SCE.geom) \
        ";

    if (filter != undefined) {
        query += "AND SCE." + filter.column + " = '" + filter.value + "'";
    }

    return query;
}

module.exports = computeRowsConcernedByScenario;