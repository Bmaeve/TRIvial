var express = require('express');
var router = express.Router();

/*
data prefix in url permit to access services 
which will return the data in geojson format
*/

let dataSelection = require('../js/dataSelection')


/* every row is returned with its geometry and features in geojson format */
/* POST  request */
router.post('/:table/selectData', function (req, res) {
  let table_name = req.params.table;
  let body = req.body;

  let response = dataSelection(table_name, body);
  response.then((GeoJson) => { res.status(200).jsonp(GeoJson) })
    .catch((err) => {
      if ((err.code == "42P01") || (err.code == "42703")) { // column or table doesn't exists
        res.status(400).send(err.message);
      } else {
        console.log("error in promise : " + err);
        res.status(500).send("Internal error");
      }
    })
});

/* every row is returned with its geometry and features in geojson format */
/* GET  request */
router.get('/:table/selectData', function (req, res) {
  let table_name = req.params.table;
  let body = { GETrequest: true };

  let response = dataSelection(table_name, body);
  response.then((GeoJson) => { res.status(200).jsonp(GeoJson) })
    .catch((err) => {
      if ((err.code == "42P01") || (err.code == "42703")) { // column or table doesn't exists
        res.status(400).send(err.message);
      } else {
        console.log("error in promise : " + err);
        res.status(500).send("Internal error");
      }
    })
});

module.exports = router;
