let pool = require('./poolPg');

async function getTables() {
  /*
  Finds every available table
  */

  let features = []

  // SQL query
  var query = " \
    SELECT table_name \
    FROM information_schema.tables \
    WHERE table_schema='public' \
    AND table_type='BASE TABLE' \
    AND table_name!='spatial_ref_sys' \
    ";

  // send and retrieve data
  let results = await pool.query(query)

  results.rows.forEach(element => {
    features.push(element.table_name);
  })

  return features;
}

module.exports = getTables;