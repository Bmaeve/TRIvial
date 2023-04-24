let pool = require('./poolPg');

async function featureSelection(table_name, idTopo) {
    /*
    returns the single feature corresponding to the given id_bdtopo

    table_name: name of the table
    idTopo: value of the 'id_bdtopo' column
    */

    let features = [];

    //SQL query
    var query = " \
        SELECT *,ST_AsGeoJSON(geom)::json as geometry \
        FROM " + table_name + " \
        WHERE id_bdtopo = '" + idTopo + "'\
        ;";


    // send and retrieve data
    let results = await pool.query(query);

    // build the features data lists
    results.rows.forEach(element => {
        const properties = {} //empty properties clone

        // clone and copy data source properties
        Object.keys(element).forEach(el => {
            if (el != 'geom' && el != 'geometry') {
                properties[el] = element[el]
            }
        })

        // create the geojson feature
        var feature = {
            "type": "Feature",
            "properties": properties,
            "geometry": {
                "type": element.geometry.type,
                "coordinates": element.geometry.coordinates
            }
        }

        // push feature in features list
        features.push(feature)

    })

    // geojson data
    const GeoJson = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::2154" } },
        "features": features
    }

    return GeoJson;

}

module.exports = featureSelection;