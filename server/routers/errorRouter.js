const express = require('express')
const router = express.Router();
const errorController = require('../controllers/errorController')

router.post('/getResourceError', (req, res) => {
    errorController.getResourceError(req.body, data => {
        res.send(data)
    })
})

router.post('/getNoneResourceError', (req, res) => {
    errorController.getNoneResourceError(req.body, data => {
        res.send(data)
    })
})
module.exports = router;