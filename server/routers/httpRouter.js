const express = require('express')
const router = express.Router();
const httpController = require('../controllers/httpController')

router.post('/getError', (req, res) => {
    httpController.getError(req.body, data => {
        res.send(data)
    })
})

router.post('/getSuccessRate', (req, res) => {
    httpController.getSuccessRate(req.body, data => {
        res.send(data)
    })
})
module.exports = router;