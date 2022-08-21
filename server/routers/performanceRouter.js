const express = require('express')
const router = express.Router();
const performanceController = require('../controllers/performanceController')

router.post('/getData', (req, res) => {
  performanceController.getData(req.body, data => {
    res.send(data)
  })
})

module.exports = router;