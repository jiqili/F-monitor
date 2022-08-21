const {sourceMapAnalysis} = require('../utils/sourceMap')
const { Op } = require('sequelize')
const HttpData = require('../models/http')
exports.add = function (data, callback) {
    let {browser, name, platform, timeStamp} = data
    let {requestMethod, requestUrl, status, sendtime, duration} = data.data
    if(name.indexOf('error') !== -1) {
        let {requestData, stack} = data.data
        let positions = []
        stack.forEach(item => {
            let tmp = item.match(/\d+/g)
            if(tmp && tmp.length > 1)
                positions.push({line: parseInt(tmp[tmp.length-2]), column: parseInt(tmp[tmp.length-1])})
        })
        sourceMapAnalysis(positions).then(res => {
            let dataString = JSON.stringify({requestMethod, requestUrl, status, sendtime, duration, requestData, stack: res})
            HttpData.create({browser, name, platform, timeStamp, data: dataString})  
        })
    }else {
        let dataString = JSON.stringify({requestMethod, requestUrl, status, sendtime, duration})
        HttpData.create({browser, name, platform, timeStamp, data: dataString})        
    }
}

exports.getError = async function(data, callback) {
    let { start, end } = data
    let list = await HttpData.findAll({
        where: {
            timeStamp: {
                [Op.gte]: start,
                [Op.lte]: end
            },
            name: {
                [Op.like]: '%error'
            }
        },
        attributes: [
            'name',
            'timeStamp',
            'platform',
            'browser',
            'data'
        ],
        raw: true,
    })
    list.forEach(item => {
        let tmp = JSON.parse(item.data)
        delete item.data
        Object.assign(item, tmp)
    })
    
    callback(list)
}

exports.getSuccessRate = async function(data, callback) {
    let { start, end } = data
    let list = await HttpData.findAll({
        where: {
            timeStamp: {
                [Op.gte]: start,
                [Op.lte]: end
            },
        },
        attributes: [
            'name',
        ],
        raw: true,
    })
    let successCnt = 0
    list.forEach(item => {
        if(item.name.indexOf('success') !== -1) successCnt++
    })
    
    callback({rate: successCnt / list.length})
}