var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('repo: ' + req.query.repo + ' - ios: ' + req.query.ios + ' - android: ' + req.query.android)
})

router.post('/', function (req, res) {
  res.send('repo: ' + req.body.repo + ' - ios: ' + req.body.ios + ' - android: ' + req.body.android)
})

module.exports = router
