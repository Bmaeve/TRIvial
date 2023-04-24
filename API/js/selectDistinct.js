let pool = require('../routes/poolPg');

async function selectDistinct(table_name, column_name) {
  /*
  select distinct values of a column in a table

  table_name: name of the table
  column_name: name of the column
  */

  let features = []

  // SQL query
  var query = " \
      SELECT DISTINCT " + column_name + " AS value \
      FROM " + table_name + " \
      ";

  // send and retrieve data
  let results = await pool.query(query)

  results.rows.forEach(element => {
    features.push(element.value);
  })

  return features;
}

module.exports = selectDistinct;