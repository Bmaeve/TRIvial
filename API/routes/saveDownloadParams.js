var express = require('express');
var router = express.Router();
const fs = require('fs');

/* POST  request */
router.post('/', function (req, res) {
    let bool = true;
    let i = 0;
    while (bool) {
        let name = "parameters/parameters" + i.toString() + ".json";
        if (fs.existsSync(name)) {
            i++;
        } else {
            bool = false;
            fs.writeFileSync(name, JSON.stringify(req.body.params));
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