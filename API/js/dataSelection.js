let pool = require('./poolPg');
let enjeux = require('../parameters/enjeux.json')

async function dataSelection(table_name, body) {
    /*
    select data in the specified table 

    table_name : name if the table 
    body : parameters to filter the data, it looks like :
        { 
            filters: ["value1", "c'est valide même avec une apostrophe"],
            columnFiltered: "column1"  // if undefined, it will look into enjeux.json file
        }
    */

    let features = [];

    //SQL query
    var query = " \
        SELECT *,ST_AsGeoJSON(geom)::json as geometry \
        FROM " + table_name + " \
        WHERE 1=1 \ "; // WHERE 1=1 permit to add "AND" filters next



    // filtering
    if ((body.filters) != undefined) {
        // updating filters to prevent single quotes issues in sql
        let newFilters = body.filters.map(filter => filter.replace("'", "\\''"))

        // defining colummnFiltered if needed
        if ((body.columnFiltered) == undefined) {
            body.columnFiltered = enjeux[table_name].columnsToKeep[0];
        }

        if ((body.filters.length > 0)) {
            query += " AND (" + body.columnFiltered + " IN ('" + newFilters.join("', '") + "')";

            // adding a filter with null values if needed
            if (body.displayNullValues == true) {
                query += " OR " + body.columnFiltered + " IS NULL "
            }

            query += " ) ";

        } else {
            // adding a filter with null values if needed
            if (body.displayNullValues == true) {
                query += " AND " + body.columnFiltered + " IS NULL "
            }
        }
    }

    // adding a filter with min heigh
    if ((body.minHeigh != undefined) && enjeux[table_name].hasColumnNamedHauteur) {
        query += " AND hauteur >= " + body.minHeigh;
    }

    // adding a filter with max heigh
    if ((body.maxHeigh != undefined) && enjeux[table_name].hasColumnNamedHauteur) {
        query += " AND hauteur < " + body.maxHeigh;
    }
    //adding a filter with id
    if ((body.id != undefined)) {
        query += " AND id = " + body.id
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