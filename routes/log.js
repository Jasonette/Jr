var express = require('express')
var fs = require('fs-extra')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  fs.readFile('log.txt', (err, data) => {
    if (err) throw err
    else res.send("" + data)
  })
})

router.get('/:request', function(req, res) {
  res.send('Request logged')
  console.log("Request: " + req.params.request)
  fs.outputFile('log.txt', req.params.request, (err) => {
    if (err) throw err
  })
})

module.exports = router
