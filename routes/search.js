var express = require('express')
var got = require('got')
var router = express.Router()

router.get('/', function (req, res, next) {
  console.log('http://jasonx.herokuapp.com/search/' + req.query.search + '.json')
  got('http://jasonx.herokuapp.com/search/' + req.query.search + '.json')
    .then(response => {
      res.send(response.body)
    })
    .catch(error => {
      res.send(error.response.body)
    })
})

module.exports = router
