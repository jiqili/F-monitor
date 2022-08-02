require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
// const performanceRouter = require('./routers/performanceRouter')
// const errorRouter = require('./routers/errorRouter')
// const httpRouter = require('./routers/httpRouter')
const userDataRouter = require('./routers/userDataRouter')
const userDataController = require('./controllers/userDataController')
var app = express()

// express configs
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'text/plain'}))

// routes
// app.use('/performance', performanceRouter)
// app.use('/http', httpRouter)
// app.use('/error', errorRouter)
app.use('/userData', userDataRouter)


// urls for the monitored web
app.post('/', function (req, res) {
  if(req.body.type === 'User') {
    userDataController.add(req.body.data)
  }
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