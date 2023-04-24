let pool = require('../routes/poolPg');

async function nearestVertexView(long, lat) {

    //SQL request
    let query = "SELECT v.id, v.the_geom, string_agg(distinct(e.type),',') AS name \
    FROM trans_l_noded_vertices_pgr AS v, trans_l_noded AS e \
    WHERE v.id = (SELECT id \
            FROM trans_l_noded_vertices_pgr \
            ORDER BY ST_SetSRID(the_geom,2154) <-> ST_SetSRID(ST_MakePoint("+ long + ", " + lat + "), 2154) LIMIT 1)\
        AND (e.source = v.id OR e.target = v.id)\
    GROUP BY v.id, v.the_geom";

    // send and retrieve data
    let results = await pool.query(query);

    let feature = results.rows[0];

    return feature;
}

module.exports = nearestVertexView;

