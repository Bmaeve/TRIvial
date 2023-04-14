var express = require('express');
var router = express.Router();
const fs = require('fs');

/* POST  request */
router.post('/', function (req, res) {
    let bool = true;
    let i = 0;
    let store_directory = "parameters/paramSaved/"

    // check if the directory exist, and create it if not
    if (!fs.existsSync(store_directory)) {
        fs.mkdir(store_directory, (err) => {
            if (err) {
                return console.log(err);
            }
        })
    }

    let fileName = store_directory + req.body.name + ".json";
    while (bool) {
        if (fs.existsSync(fileName)) {
            fileName = store_directory + req.body.name + i.toString() + ".json";
            i++;
        } else {
            bool = false;
            fs.writeFileSync(fileName, JSON.stringify(req.body.params));
        }
    }

    //Geojson data
    const GeoJson = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::2154" } },
        "features": 1
    }

    //API response
    res.status(200).jsonp(GeoJson);
});

module.exports = router;