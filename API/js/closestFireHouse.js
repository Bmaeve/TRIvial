let pool = require('./poolPg');

/**
 * Function to retrieve the closest non impacted fire house to where we clicked
 * @param {geom} geometry the geometry we clicked on
 * @param {string} scenario the scenario involved
 * @returns the fire house
 */

async function getClosestFireHouse(geometry, scenario) {
    geometry.crs = { "type": "name", "properties": { "name": "EPSG:2154" } };
    //SQL request
    let query_casernes = "SELECT *, ST_AsGeoJSON(geom)::json as geometry, ST_Distance(geom, ST_GeomFromGeoJSON('" + JSON.stringify(geometry) + "')) AS distObj  \
    FROM def WHERE nature = 'Caserne de pompiers' AND intersectwith_scenarios_"+ scenario + "=false \
    ORDER BY distObj ASC \
    LIMIT 1";

    // send and retrieve data
    let results = await pool.query(query_casernes);

    let feature = results.rows[0];

    return feature;
}

module.exports = getClosestFireHouse;

