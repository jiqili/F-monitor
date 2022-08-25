const UserData = require('../models/userData')
const { Op, QueryTypes } = require('sequelize')
const sequelize = require('../db')
exports.add = function (data, callback) {
    let {browser, name, platform, timeStamp} = data
    let { url, user} = data.data
    UserData.create({browser, name, platform, timeStamp, url, user})
}

exports.getPV = async function (data, callback) {
    let { start, end } = data
    let pv = await UserData.findAll({
        where: {
            timeStamp: {
                [Op.gte]: start,
                [Op.lte]: end
            },
            name: 'enter'
        },
        attributes: [
            'url',
            [sequelize.fn('COUNT', sequelize.col('id')), 'pv']
        ],
        group: 'url',
        plain: false,
        order:[
            [sequelize.fn('COUNT', sequelize.col('id')), 'ASC']
        ]
    })
    callback(pv)
}
exports.getUV = async function (data, callback) {
    let { start, end } = data
    let ret = await sequelize.query(
        'SELECT DISTINCT url, user FROM userdata WHERE timeStamp >= ? AND timeStamp <= ? AND name = "enter"' ,
        {
            replacements: [start, end],
            type:QueryTypes.SELECT
        }
    )
    let uvMap = new Map()
    let uv = []
    ret.forEach(item => {
        if(!uvMap.has(item.url)){
            uvMap.set(item.url, uv.length)
            uv.push({url: item.url, visit: [item.user]})
        }else {
            uv[uvMap.get(item.url)].visit.push(item.user)
        }
    });
    callback(uv)
}
exports.getPopularBrowser = async function(callback) {
    let browserList = await UserData.findAll({
        attributes: [
            'browser',
            [sequelize.fn('COUNT', sequelize.col('id')), 'number']
        ],
        group: 'browser',
        plain: false,
        order: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'ASC']
        ]
    }) 
    callback(browserList)
}