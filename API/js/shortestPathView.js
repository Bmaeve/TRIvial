let pool = require('../routes/poolPg');

async function shortestPathView(source, target, scenario) {
    //SQL request
    let query = "DROP VIEW IF EXISTS trans_l_vue;\
    CREATE VIEW trans_l_vue (id, scenario, geom, source, target, cost) \
AS SELECT n.id, f.intersectwith_scenarios_"+ scenario + ", n.geom, n.source,n.target,n.distance \
FROM trans_l_noded AS n, trans_l_flat AS f WHERE \
f.intersectwith_scenarios_02Moy=false AND f.uuid = n.id;\
    SELECT min(r.seq) AS seq, e.old_id AS id, e.name, e.type, sum(e.distance) AS distance, ST_Collect(e.geom) AS geom \
                        FROM pgr_dijkstra('SELECT n.id,n.source,n.target,n.cost FROM trans_l_vue AS n'," + parseInt(source) + "," + parseInt(target) + ",\
                        false) AS r, trans_l_noded AS e WHERE r.edge=e.id GROUP BY e.old_id,e.name,e.type;"

    console.log("Requête envoyée :");
    console.log(query);
    console.log(scenario);
    // send and retrieve data
    let results = await pool.query(query);

    let features = results[2].rows;
    return features;
}

module.exports = shortestPathView;

