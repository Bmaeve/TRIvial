var express = require('express');
var router = express.Router();
const fs = require('fs');

/* POST  request */
router.post('/name', function (req, res) {
    let bool = true;
    let i = 0;
    let data = [];
    while (bool) {
        let name = "parameters/parameters" + i.toString() + ".json";
        if (fs.existsSync(name)) {
            data.push(name);
        } else {
            bool = false;
        }
        i++;
    }

    //Json data
    const dataJson = { data: data }

    //API response
    res.status(200).json(dataJson);
});

router.post('/data', function (req, res) {
    let data = [];
    if (fs.existsSync(req.body.texte)) {
        console.log(JSON.parse(fs.readFileSync(req.body.texte)));
        console.log(req.body.texte);
        data.push(JSON.parse(fs.readFileSync(req.body.texte)));
    } else {
        console.error("Le fichier n'existe pas !");
    }

    //API response
    res.status(200).json({ data: data });
});

module.exports = router;