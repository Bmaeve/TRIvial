let pool = require('../routes/poolPg');
let enjeux = require('../parameters/enjeux.json')

async function dataSelection(table_name, body) {
    let features = [];

    //SQL query
    // WHERE 1=1 permit to add "AND" filters next
    var query = " \
          SELECT *,ST_AsGeoJSON(geom)::json as geometry \
          FROM " + table_name + " \
          WHERE 1=1 \ ";



    // filtering
    if ((body.filters) != undefined) {
        // updating filters to prevent single quotes issues in sql
        let newFilters = body.filters.map(filter => filter.replace("'", "\\''"))
        if ((body.filters.length > 0)) {
            if ((body.columnFiltered) == undefined) {
                // if the colummnFiltered parameters has'nt been defined 
                body.columnFiltered = enjeux[table_name].columnsToKeep[0];
            }
            query += " AND " + body.columnFiltered + " IN ('" + newFilters.join("', '") + "')";
        }
    }

    // adding a filter with min heigh
    if ((body.minHeigh != undefined) && enjeux[table_name].hasColumnNamedHauteur) {
        query += " AND hauteur > " + body.minHeigh;
    }

    // adding a filter with max heigh
    if ((body.maxHeigh != undefined) && enjeux[table_name].hasColumnNamedHauteur) {
        query += " AND hauteur < " + body.maxHeigh;
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