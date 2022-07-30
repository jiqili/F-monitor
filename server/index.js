const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'text/plain'}))
app.post('/', function (req, res) {
  console.log(req.body)
  res.send('Hello World');
})
app.get('/xhr', (req, res) => {
  res.send('XHR request successfully.')
})
app.get('/fetch', (req, res) => {
  res.send({data: 'Fetch successfully.'})
})
var server = app.listen(8080, function () {
  console.log('server is listening the port of 8080')
})