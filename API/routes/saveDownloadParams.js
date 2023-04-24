var express = require('express');
var router = express.Router();

/*
importParams prefix in url permit to access services 
which will permit to the user importing and saving parameters
*/

const fs = require('fs');
let path = require('path');
let store_directory = "parameters/paramSaved/"

/* save parameters into a json file */
/* POST  request */
router.post('/', function (req, res) {
    let bool = true;
    let i = 0;

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

    //API response
    res.status(200).jsonp({ status: true });
});

/* returns every filenames present in directory */
/* GET  request */
router.get('/filenames', function (req, res) {
    let data = [];
    let dir = fs.readdirSync(store_directory);
    for (let i = 0; i < dir.length; i++) {
        if (fs.existsSync(store_directory + dir[i])) {
            data.push(dir[i]);
        }
    }

    // Json data
    const dataJson = { data: data }

    // API response
    res.status(200).json(dataJson);
});

/* returns the parameters contained in the json file */
/* POST  request */
router.get('/getData', function (req, res) {
    let data = [];
    let paramsPath = path.join(store_directory, req.query.filename + ".json")
    console.log(paramsPath)

    //console.log(path)
    if (fs.existsSync(paramsPath)) {
        data.push(JSON.parse(fs.readFileSync(paramsPath)));
    } else {
        console.error("Le fichier n'existe pas !");
    }

    // API response
    res.status(200).json({ data: data });
});

module.exports = router;