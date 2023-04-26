var express = require('express');
var router = express.Router();

let nearestVertex = require('../js/nearestVertexView')
let shortestPath = require('../js/shortestPathView')

/* Find nearest route portion to a point*/
/* POST Resquest */
router.post('/getNearestVertex', function (req, res) {
    let body = req.body;
    let response = nearestVertex(body.long, body.lat);
    response.then((GeoJson) => { res.status(200).jsonp(GeoJson) })
        .catch((err) => {
            console.log("error in promise : " + err);
            res.status(500).send("Internal error");
        })
});

/* Find shortest itienrary between two points*/
/* POST Resquest */
router.post('/getShortestPath', function (req, res) {
    let body = req.body;
    let response = shortestPath(body.source, body.target, body.scenario);
    response.then((GeoJson) => { res.status(200).jsonp(GeoJson) })
        .catch((err) => {
            console.log("error in promise : " + err);
            res.status(500).send("Internal error");
        })
});

module.exports = router;
