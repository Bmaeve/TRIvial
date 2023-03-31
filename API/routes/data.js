var express = require('express');
var router = express.Router();

let pool = require('./poolPg');

/* POST  request */
router.post('/:table/selectData', function (req, res) {
  let table_name = req.params.table;
  let body = req.body;

  dataSelection(table_name, body, req, res);
});

/* GET  request */
router.get('/:table/selectData', function (req, res) {
  let table_name = req.params.table;
  let body = {};

  dataSelection(table_name, body, req, res);
});


function dataSelection(table_name, body, req, res) {

  let features = [];

  //SQL query
  var query = " \
        SELECT *,ST_AsGeoJSON(geom)::json as geometry \
        FROM " + table_name + " \
        WHERE 1=1 \
        ";

  // adding filters to query according to body
  Object.keys(body).forEach(column => {
    if (body[column].min !== undefined) {
      query += " AND " + column + " > " + body[column].min;
    } else if (body[column].max !== undefined) {
      query += " AND " + column + " < " + body[column].max;
    } else if (body[column].values !== undefined) {
      query += " AND " + column + " IN ('" + body[column].values.join("', '") + "')";
    }
  })

  // send and retrieve data
  let promise = pool.query(query);

  promise.then((results) => {
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

    // api response
    res.status(200).jsonp(GeoJson)
  })
    .catch((err) => {
      if ((err.code == "42P01") || (err.code == "42703")) { // column or table doesn't exists
        res.status(400).send(err.message);
      } else {
        console.log("error in promise : " + err);
        res.status(500).send("Internal error");
      }
    })
}

module.exports = router;
