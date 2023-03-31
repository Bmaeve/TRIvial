var express = require('express');
var router = express.Router();

let pool = require('./poolPg');

let enjeux = require('../parameters/enjeux.json');
let ignoredColumns = require('../parameters/ignoredColumns.json');

/* GET  request */
router.get('/getTypesEnjeux', function (req, res, next) {

  let promises = [];
  let result_array = [];

  Object.keys(enjeux).forEach((enjeu) => {

    //SQL request
    var query = " \
        SELECT COLUMN_NAME, DATA_TYPE \
        FROM INFORMATION_SCHEMA.COLUMNS \
        WHERE TABLE_NAME = '" + enjeu + "' \
        ";

    ignoredColumns.forEach((columnToignore) => {
      query += "AND COLUMN_NAME != '" + columnToignore + "'";
    })

    // send and retrieve data
    let enjeuPromise = pool.query(query)
      .then((results) => {
        var features = []
        // build the features data lists
        results.rows.forEach(element => {
          features.push({
            column_name: element.column_name,
            data_type: element.data_type
          })
        })

        if (features.length != 0) {
          result_array.push({
            key: enjeu,
            fullName: enjeux[enjeu],
            columns: features
          })
        }

      })

    promises.push(enjeuPromise);
  })

  Promise.all(promises)
    .then(() => {
      // api response
      res.status(200).jsonp(result_array)
    })
    .catch((error) => {
      console.log("error in promise : " + error);
      res.status(500).send('Internal error')
    })

});

module.exports = router;
