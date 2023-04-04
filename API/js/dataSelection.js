let pool = require('../routes/poolPg');
let enjeux = require('../parameters/enjeux.json')

async function dataSelection(table_name, body) {

    let features = [];

    //SQL query
    var query = " \
          SELECT *,ST_AsGeoJSON(geom)::json as geometry \
          FROM " + table_name + " \
          ";

    // filtering
    if ((body.filters.length > 0)) {
        if ((body.columnFiltered) == undefined) {
            // if the colummnFiltered parameters has'nt been defined 
            body.columnFiltered = enjeux[table_name].columnsToKeep[0];
        }
        query += " WHERE " + body.columnFiltered + " IN ('" + body.filters.join("', '") + "')";
    }

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

module.exports = dataSelection;