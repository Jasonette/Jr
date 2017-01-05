var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('Log page')
});

router.get('/:request', function(req, res) {
  res.send(req.params)
});

module.exports = router;
