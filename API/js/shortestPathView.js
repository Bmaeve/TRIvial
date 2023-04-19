let pool = require('../routes/poolPg');

async function shortestPathView(source, target) {
    //SQL request
    let query = "SELECT min(r.seq) AS seq, e.old_id AS id, e.name, e.type, \
    sum(e.distance) AS distance, ST_Collect(e.geom) AS geom \
    FROM pgr_dijkstra('SELECT id,source,target,distance AS cost \
                        FROM trans_l_noded',"+ parseInt(source) + "," + parseInt(target) + ",false) AS r, \
                        trans_l_noded AS e \
                        WHERE r.edge=e.id GROUP BY e.old_id,e.name,e.type";

    // send and retrieve data
    let results = await pool.query(query);

    let features = results.rows;

    return features;
}

module.exports = shortestPathView;
