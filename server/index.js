require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const performanceRouter = require('./routers/performanceRouter')
const errorRouter = require('./routers/errorRouter')
const httpRouter = require('./routers/httpRouter')
const userDataRouter = require('./routers/userDataRouter')
const userDataController = require('./controllers/userDataController');
const performanceController = require('./controllers/performanceController')
const errorController = require('./controllers/errorController')
const httpController = require('./controllers/httpController')
var app = express()

// express configs
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'text/plain'}))

// routes
app.use('/performance', performanceRouter)
app.use('/http', httpRouter)
app.use('/error', errorRouter)
app.use('/userData', userDataRouter)


// urls for the monitored web
app.post('/', function (req, res) {
  req.body.forEach(item => {
    const type = item.type
    if(type === 'User') {
      userDataController.add(item)
    }else if(type === 'Performance') {
      performanceController.add(item)
    }else if(type === 'Error') {
      errorController.add(item)
    }else if(type === 'Request') {
      httpController.add(item)
    }
  })
  res.status(200).send()
})
app.get('/cookie', (req, res) => {
  res.send({data: 'ok'})
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