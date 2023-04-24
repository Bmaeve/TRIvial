let pool = require('../routes/poolPg');

async function getClosestFireHouse(geometry, scenario) {
    geometry.crs = { "type": "name", "properties": { "name": "EPSG:2154" } };
    console.log("scenario");
    console.log(scenario);
    //SQL request
    let query_casernes = "SELECT *, ST_AsGeoJSON(geom)::json as geometry, ST_Distance(geom, ST_GeomFromGeoJSON('" + JSON.stringify(geometry) + "')) AS distObj  \
    FROM def WHERE nature = 'Caserne de pompiers' AND intersectwith_scenarios_"+ scenario + "=false \
    ORDER BY distObj ASC \
    LIMIT 1";
    //AND intersectwith_scenarios_01for=f AND intersectwith_scenarios_04fai=f
    // send and retrieve data
    let results = await pool.query(query_casernes);

    let feature = results.rows[0];

    return feature;
}

module.exports = getClosestFireHouse;

// 