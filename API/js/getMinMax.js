let pool = require('./poolPg');

function getMinMax(table_name, column_name) {
  /*
  Returns min and max values for a column

  table_name: name of the table
  column_name: name of the column
  */

  let features = []

  // SQL query
  var query = " \
    SELECT MIN(" + column_name + "), MAX(" + column_name + ") \
    FROM " + table_name + " \
    ";

  // send and retrieve data
  let promise = pool.query(query)
    .then((results) => {
      return {
        minimum: results.rows[0].min,
        maximum: results.rows[0].max
      }
    })

  return promise
}

module.exports = getMinMax;