const express = require('express')
const router = express.Router();
const performanceController = require('../controllers/performanceController')

router.post('/add', ((req, res) => {
  let {number, deviceNumber, deviceName, time} = req.body
    if(!number || !time || !deviceName || !deviceNumber) {
        res.send({code: Setting.MissParameter, message: '缺失参数'})
    }else {
      Report.add({number, deviceName, deviceNumber, time}, (data) => {
            res.send({code: Setting.Success, data: data})
        })
    }
}))

module.exports = router;