const express = require('express')
const bodyParser = require('body-parser');
var app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'text/plain'}))
app.post('/', function (req, res) {
  console.log(req.body)
  res.send('Hello World');
})
var server = app.listen(8080, function () {
  console.log('server is listening the port of 8080')
})