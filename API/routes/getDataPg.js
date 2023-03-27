var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgresql',
  database: 'open_data',

})



/* GET  request */
router.get('/', async function (req, res, next) {

  //SQL request
  var query = 'select *,ST_AsGeoJSON(geom)::json as geometry from bati_indiferrencie;'


  // send and retrieve data
  await pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    var features = []
    // build the features data lists
    results.rows.forEach(element => {
      // get properties keys
      const listKeys = Object.keys(element)

      //empty properties clone
      const properties = {}

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
    });

    // geojson data
    const GeoJson = {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::2154" } },
      "features": features
    }

    // api response
    res.status(200).jsonp(GeoJson)
  })


});

module.exports = router;
