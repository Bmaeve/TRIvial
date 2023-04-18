let pool = require('../routes/poolPg');

async function getClosestFireHouse(geometry) {
    geometry.crs = { "type": "name", "properties": { "name": "EPSG:2154" } };

    //SQL request
    let query_casernes = "SELECT *, ST_AsGeoJSON(geom)::json as geometry, ST_Distance(geom, ST_GeomFromGeoJSON('" + JSON.stringify(geometry) + "')) AS distObj  \
    FROM def WHERE nature = 'Caserne de pompiers' \
    ORDER BY distObj ASC \
    LIMIT 1";

    // send and retrieve data
    let results = await pool.query(query_casernes);

    let feature = results.rows[0];

    return feature;
}

module.exports = getClosestFireHouse;

// 