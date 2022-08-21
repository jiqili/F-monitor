const {sourceMapAnalysis} = require('../utils/sourceMap')
const ErrorData = require('../models/error')
const { Op } = require('sequelize')
exports.add = function (data, callback) {
    let {browser, name, platform, timeStamp} = data
    if(name === 'JS Error') {
        let {url, reason} = data.data
        sourceMapAnalysis([{line: data.data.row, column: data.data.col}]).then(res => {
            let dataString = JSON.stringify({url, reason, code: res})
            ErrorData.create({browser, name, platform, timeStamp, data: dataString})   
        })
    }
    else {
        let dataString = JSON.stringify(data.data)
        ErrorData.create({browser, name, platform, timeStamp, data: dataString})        
    }
}

exports.getResourceError = async function(data, callback) {
    let { start, end } = data
    let list = await ErrorData.findAll({
        where: {
            timeStamp: {
                [Op.gte]: start,
                [Op.lte]: end
            },
            name: 'Resource Error'
        },
        attributes: [
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

exports.getNoneResourceError = async function(data, callback) {
    let { start, end } = data
    let list = await ErrorData.findAll({
        where: {
            timeStamp: {
                [Op.gte]: start,
                [Op.lte]: end
            },
            name: {
                [Op.not]: 'Resource Error'
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