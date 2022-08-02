const express = require('express')
const router = express.Router();
const userDataController = require('../controllers/userDataController')

router.post('/getPV', ((req, res) => {
    let { start, end } = req.body
    userDataController.getPV({ start, end }, data => {
        res.send(data)
    })
}))

router.post('/getUV', ((req, res) => {
    let { start, end } = req.body
    userDataController.getUV({ start, end }, data => {
        res.send(data)
    })
}))

module.exports = router;