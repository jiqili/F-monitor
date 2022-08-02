const UserData = require('../models/userData')
const { Op, QueryTypes } = require('sequelize')
const sequelize = require('../db')
exports.add = function (data, callback) {
    let { time, path, device } = data
    UserData.create({time, path, device}).catch(error =>{
        console.log(error)
    })
}

exports.getPV = async function (data, callback) {
    let { start, end } = data
    let pv = await UserData.findAll({
        where: {
            time: {
                [Op.gte]: start,
                [Op.lte]: end
            }
        },
        attributes: [
            'path',
            [sequelize.fn('COUNT', sequelize.col('device')), 'pv']
        ],
        group: 'path',
        plain: false,
        order:[
            [sequelize.fn('COUNT', sequelize.col('device')), 'ASC']
        ]
    })
    callback(pv)
}
exports.getUV = async function (data, callback) {
    let { start, end } = data
    let ret = await sequelize.query(
        'SELECT DISTINCT path, device FROM userdata WHERE time >= ? AND time <= ?',
        {
            replacements: [start, end],
            type:QueryTypes.SELECT
        }
    )
    let uvMap = new Map()
    let uv = []
    ret.forEach(item => {
        if(!uvMap.has(item.path)){
            uvMap.set(item.path, uv.length)
            uv.push({path: item.path, visit: [item.device]})
        }else {
            uv[uvMap.get(item.path)].visit.push(item.device)
        }
    });
    callback(uv)
}
