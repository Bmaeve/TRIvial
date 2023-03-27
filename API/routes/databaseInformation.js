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
      console.log(error)
      res.status(500).send('Internal error')
    } else {
      console.log(results);

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

module.exports = router;
