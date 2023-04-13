var express = require('express');
var router = express.Router();
const fs = require('fs');

/* POST  request */
router.post('/', function (req, res) {
    let bool = true;
    let i = 0;
    let fileName = "parameters/paramSaved/" + req.body.name + ".json";
    while (bool) {
        if (fs.existsSync(fileName)) {
            fileName = "parameters/paramSaved/" + req.body.name + i.toString() + ".json";
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