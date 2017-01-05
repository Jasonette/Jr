var express = require('express')
var app = express()
var db = require('./db.js')
var Extension = db.init()

app.get('/', function (req, res) {
  Extension.find({}).sort({_id: -1}).exec(function (err, result) {
    if (err) {
      res.send('Error')
    } else {
      res.json(result)
    }
  })
})

app.listen(process.env.PORT || 3000)
