let pool = require('../routes/poolPg');
let selectDistinct = require('./selectDistinct')

async function computeRowsConcernedByScenario(table_name_enjeu, table_name_scenario, distinctScenarioColumn) {
    /*
    for the "enjeu" and the "scenario" selected, compute new columns which respresent the fact
    that a feature in "enjeu" is concerned by the "scenario"
    it use the postgis function ST_INTERSECTS in the query

    table_name_enjeu: name of the "enjeu" table
    table_name_scenario: name of the "scenario" table
    distinctScenarioColumn: 
        if undefined it will take every feature in scenario table and compute a single column
        if a scenario is precised it will compute a new column for each distinct value in scenario table
    */

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
        ADD COLUMN " + newColumnName + " BOOLEAN DEFAULT(false);\
        \
        UPDATE " + table_name_enjeu + " AS ENJ \
        SET " + newColumnName + " = true \
        FROM " + table_name_scenario + " AS SCE \
        WHERE st_intersects(ENJ.geom, SCE.geom) \
        AND ST_IsValid(ENJ.geom) \
        AND ST_IsValid(SCE.geom) \
        ";

    if (filter != undefined) {
        query += "AND SCE." + filter.column + " = '" + filter.value + "'";
    }

    return query;
}

module.exports = computeRowsConcernedByScenario;