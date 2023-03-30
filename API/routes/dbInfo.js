var express = require('express');
var router = express.Router();

let pool = require('./poolPg');

/* GET  request */
router.get('/getTables', async function (req, res, next) {

  //SQL request
  var query = " \
        SELECT table_name \
        FROM information_schema.tables \
        WHERE table_schema='public' \
        AND table_type='BASE TABLE' \
        AND table_name!='spatial_ref_sys' \
        ";

  // send and retrieve data
  await pool.query(query, (error, results) => {
    if (error) {
      console.log("error in promise : " + error);
      res.status(500).send('Internal error')
    } else {
      var features = []
      // build the features data lists
      results.rows.forEach(element => {
        features.push(element.table_name)
      })

      // api response
      res.status(200).jsonp(features)
    }
  })

});

/* GET  request */
router.get('/:table', async function (req, res, next) {
  let table_name = req.params.table;
  let features = [];

  //SQL request
  var query = " \
        SELECT COLUMN_NAME, DATA_TYPE \
        FROM INFORMATION_SCHEMA.COLUMNS \
        WHERE \
          TABLE_SCHEMA = 'public' AND \
          TABLE_NAME   = '" + table_name + "' AND \
          COLUMN_NAME != 'geom' AND \
          COLUMN_NAME != 'id' \
        ";

  // send and retrieve data
  let promise = pool.query(query);

  promise.then((results) => {
    // build the features data lists
    results.rows.forEach(element => {
      features.push({
        name: element.column_name,
        type: element.data_type,
      })
    })

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

/* GET  request */
router.get('/:table/:column/getDistinctValues', async function (req, res, next) {
  let table_name = req.params.table;
  let column_name = req.params.column;
  let features = [];

  //SQL request
  var query = " \
        SELECT DISTINCT " + column_name + " AS value \
        FROM " + table_name + " \
        ";

  // send and retrieve data
  let promise = pool.query(query);

  promise.then((results) => {
    results.rows.forEach(element => {
      features.push(element.value);
    })
    // api response
    res.status(200).jsonp(features)
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
