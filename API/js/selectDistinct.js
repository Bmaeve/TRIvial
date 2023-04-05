let pool = require('../routes/poolPg');

async function selectDistinct(table_name, column_name) {

    let features = []

    //SQL request
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