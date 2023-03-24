var express = require('express');
var router = express.Router();

const {Pool} = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password:'postgres',
  database:'postgres',

})



/* GET home page. */
router.get('/', async function(req, res, next) {
  var query = 'select id,prec_plani, prec_alti,origin_bat,hauteur,z_min,z_max,ST_AsGeoJSON(geom)::json as geometry from bati_indiferrencie LIMIT 2000;'
  await pool.query(query,(error,results)=>{
     if (error) {
       throw error
    }
    var features = []

    results.rows.forEach(element => {
      var feature = {
        "type":"Feature",
        "properties":{
          "id":element.id,
          "prec_plani":element.prec_plani,
          "prec_alti":element.prec_alti,
          "origin_bat":element.origin_bat,
          "hauteur":element.hauteur,
          "z_min":element.z_min,
          "z_max":element.z_max
        },
        "geometry":{
          "type":element.geometry.type,
          "coordinates":element.geometry.coordinates
        }
      }

      features.push(feature)
    });
      const GeoJson = {
    "type":"FeatureCollection",
    "crs":{ "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::2154" } },
    "features":features
      }
     res.status(200).jsonp(GeoJson)
   })
  

});

module.exports = router;
