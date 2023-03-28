var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgresql',
  database: 'open_data'
})

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

    // api response
    res.status(200).jsonp({
      name: table_name,
      columns: features
    })
  })
    .catch((err) => {
      console.log("error in promise : " + err);
      res.status(500).send("Internal error");
    })
});

module.exports = router;
