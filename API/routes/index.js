var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.json({
    message: "bienvenue sur l'API TRIvial",
    documentation: "localhost:3000/doc"
  });
});

module.exports = router;
