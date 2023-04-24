var express = require('express');
var router = express.Router();

let featureSelection = require('../js/selectFeatureByIdtopo')

/* Returns the selected feature in geojson */
/* GET  request */
router.get('/:table/:id_topo', function (req, res) {
    let table_name = req.params.table;
    let id_topo = req.params.id_topo;

    let response = featureSelection(table_name, id_topo);
    response.then((GeoJson) => { res.status(200).jsonp(GeoJson) })
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
