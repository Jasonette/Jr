var mongoose = require('mongoose')
module.exports = {
  init: function () {
    var uristring = process.env.MONGODB_URI
    var port = process.env.PORT || 5000

    mongoose.connect(uristring, function (err, res) {
      if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err)
      } else {
        console.log('Succeeded connected to: ' + uristring)
      }
    })
    var extensionSchema = new mongoose.Schema({
      name: String,
      url: String
    })
    Extension = mongoose.model('extensions', extensionSchema)
    return Extension
  }
}
