var express = require('express');
var router = express.Router();

/*
dbInfo prefix in url permit to access services 
which will return basic information about the database
*/

let pool = require('./poolPg');
let selectDistinct = require('../js/selectDistinct');
let getTables = require('../js/getTables');
let getTableInfo = require('../js/getTableInfo');

/* Finds every available table */
/* GET  request */
router.get('/getTables', async function (req, res, next) {
  getTables()
    .then(features => {
      res.status(200).jsonp(features)
    })
    .catch((error) => {
      console.log("error in promise : " + error);
      res.status(500).send('Internal error')
    })
});

/* Returns table information */
/* GET  request */
router.get('/:table', async function (req, res, next) {
  let table_name = req.params.table;

  getTableInfo(table_name)
    .then(features => {

      if (features.length == 0) {
        // check if the table exists
        res.status(400).send('relation "' + table_name + '" does not exist');
      } else {
        // api response
        res.status(200).jsonp({
          name: table_name,
          columns: features
        })
      }
    })
    .catch((err) => {
      console.log("error in promise : " + err);
      res.status(500).send("Internal error");
    })
});

/* Find the minimum and maximum values of the column */
/* GET  request */
router.get('/:table/:column/getMinMax', async function (req, res, next) {
  let table_name = req.params.table;
  let column_name = req.params.column;

  //SQL request
  var query = " \
        SELECT MIN(" + column_name + "), MAX(" + column_name + ") \
        FROM " + table_name + " \
        ";

  // send and retrieve data
  let promise = pool.query(query);

  promise.then((results) => {
    let minimum = results.rows[0].min;
    let maximum = results.rows[0].max;

    if (isNaN(minimum)) {
      // check if the result is a number
      res.status(400).send("column" + column_name + " is not a number type");
    } else {
      // api response
      res.status(200).jsonp({
        minimum: minimum,
        maximum: maximum
      })
    }
  })
    .catch((err) => {
      if ((err.code == "42P01") || (err.code == "42703")) { // column or table doesn't exists
        res.status(400).send(err.message);
      } else {
        console.log("error in promise : " + err);
        res.status(500).send("Internal error");
      }
    })
});

/* Find the distinct values of the column */
/* GET  request */
router.get('/:table/:column/getDistinctValues', async function (req, res, next) {
  let table_name = req.params.table;
  let column_name = req.params.column;

  selectDistinct(table_name, column_name)
    .then((result) => {
      res.status(200).jsonp(result) // api response
    })
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
