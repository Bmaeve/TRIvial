var express = require('express');
var router = express.Router();
const fs = require('fs');

/* POST  request */
router.post('/name', function (req, res) {
    let data = [];
    let dir = fs.readdirSync("parameters/paramSaved/");
    for (let i = 0; i < dir.length; i++) {
        if (fs.existsSync("parameters/paramSaved/" + dir[i])) {
            data.push(dir[i]);
        }
    }

    //Json data
    const dataJson = { data: data }

    //API response
    res.status(200).json(dataJson);
});

router.post('/data', function (req, res) {
    let data = [];
    if (fs.existsSync(req.body.texte)) {
        data.push(JSON.parse(fs.readFileSync(req.body.texte)));
    } else {
        console.error("Le fichier n'existe pas !");
    }

    //API response
    res.status(200).json({ data: data });
});

module.exports = router;