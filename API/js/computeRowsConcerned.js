let pool = require('../routes/poolPg');

function computeRowsConcernedByScenario(table_name_enjeu, table_name_scenario, distinctScenario) {

    let promises = [];

    newColumnName = "intersectWith" + table_name_scenario;

    let query = " \
        ALTER TABLE " + table_name_enjeu + " \
        ADD COLUMN " + newColumnName + " BOOLEAN;\
        \
        UPDATE " + table_name_enjeu + " AS ENJ \
        SET " + newColumnName + " = st_intersects(ENJ.geom, SCE.geom) \
        FROM " + table_name_scenario + " AS SCE \
        WHERE ST_IsValid(ENJ.geom) \
        AND ST_IsValid(SCE.geom) \
        "
    //WHERE SCE.scenario = '04Fai' \

    if (distinctScenario != undefined) {
        //pass
    }


    let promise = pool.query(query)
        .catch((err) => {
            if (err.code == "42701") {
                // the column already exists : it has already been computed 
                // pass
            }
        })

    promises.push(promise);
    return promises;
}

module.exports = computeRowsConcernedByScenario;