var express = require('express');
var router = express.Router();
const data = require("../datatest/batiremarquable.json");
/* GET home page. */
router.get('/', function (req, res, next) {

  res.json(data);
  //console.log(data);
});

module.exports = router;
