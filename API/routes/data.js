var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgresql',
  database: 'open_data'
})

/* POST  request */
router.post('/', function (req, res) {
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

/* GET  request */
router.get('/:table/selectData', function (req, res, next) {
  let table_name = req.params.table;
  let features = [];

  //SQL request
  var query = " \
        SELECT *,ST_AsGeoJSON(geom)::json as geometry \
        FROM " + table_name + "; \
        ";

  // send and retrieve data
  let promise = pool.query(query);

  promise.then((results) => {
    // build the features data lists
    results.rows.forEach(element => {
      const listKeys = Object.keys(element) // get properties keys
      const properties = {} //empty properties clone

      // clone and copy data source properties
      listKeys.forEach(el => {
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
      console.log("error in promise : " + err);
      res.status(500).send("Internal error");
    })
});

module.exports = router;
