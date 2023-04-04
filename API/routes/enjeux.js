var express = require('express');
var router = express.Router();

let pool = require('./poolPg');
let enjeux = require('../parameters/enjeux.json');
let dataSelection = require('../js/dataSelection');
let typesEnjeux = require('../js/typesEnjeux');

/* GET  request */
router.get('/getTypesEnjeux', function (req, res, next) {
  let result_array = []
  let promises = typesEnjeux(result_array);
  Promise.all(promises)
    .then(() => {
      res.status(200).jsonp(result_array) // api response
    })
    .catch((error) => {
      console.log("error in promise : " + error);
      res.status(500).send('Internal error')
    })
});

router.get('/:enjeu/selectData', function (req, res, next) {
  let table_name = req.params.enjeu;
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

router.post('/:enjeu/selectData', function (req, res, next) {
  let table_name = req.params.enjeu;
  let body = req.body;
  body.columnFiltered = enjeux[table_name].columnsToKeep;
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
