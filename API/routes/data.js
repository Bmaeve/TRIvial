var express = require('express');
var router = express.Router();

let dataSelection = require('../js/dataSelection')
let closestFireHouse = require('../js/closestFireHouse')

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

/* POST Resquest */
router.post('/getClosestFireHouse', function (req, res) {
  let body = req.body;
  let response = closestFireHouse(body.geometry, body.scenario);
  response.then((GeoJson) => { res.status(200).jsonp(GeoJson) })
    .catch((err) => {
      console.log("error in promise : " + err);
      res.status(500).send("Internal error");
    })
});

module.exports = router;
