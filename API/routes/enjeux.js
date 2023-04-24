var express = require('express');
var router = express.Router();

/*
enjeux prefix in url permit to access services 
specifics to enjeux relative table
*/

let enjeux = require('../parameters/enjeux.json');
let dataSelection = require('../js/dataSelection');
let getTypesEnjeux = require('../js/typesEnjeux');
let computeRowsConcernedByScenario = require('../js/computeRowsConcerned');

/* returns types of enjeu */
/* GET  request */
router.get('/getTypesEnjeux', function (req, res, next) {
  getTypesEnjeux()
    .then((result) => {
      res.status(200).jsonp(result) // api response
    })
    .catch((error) => {
      console.log("error in promise : " + error);
      res.status(500).send('Internal error')
    })
});

/* Return every row of the given "enjeu" */
/* GET  request */
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

/* Returns data of the given "enjeu" according to parameters */
/* POST  request */
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

/* compute new columns to know if a feature is concerned by the specified scenario */
/* PUT  request */
router.put('/:enjeu/:scenario/computeConcernedRows', function (req, res, next) {
  let table_name_enjeu = req.params.enjeu;
  let table_name_scenario = req.params.scenario;
  let distinctScenario = req.query.distinctScenario;

  computeRowsConcernedByScenario(table_name_enjeu, table_name_scenario, distinctScenario)
    .then((result) => {
      Promise.all(result.promises)
        .then(() => {
          res.status(200).jsonp({ status: true, newColumns: result.newColumns })
        })
        .catch((err) => {
          if ((err.code == "42P01") || (err.code == "42703")) { // column or table doesn't exists
            res.status(400).send(err.message);
          } else {
            console.log("error in promise : " + err);
            res.status(500).send("Internal error");
          }
        })
    })
});

module.exports = router;
