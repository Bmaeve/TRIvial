let pool = require('../routes/poolPg');

async function getTableInfo(table_name) {
  /*
  Finds every available table
  */

  let features = []

  // SQL query
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
  let results = await pool.query(query)

  results.rows.forEach(element => {
    features.push({
      name: element.column_name,
      type: element.data_type,
    })
  })

  return features;
}

module.exports = getTableInfo;