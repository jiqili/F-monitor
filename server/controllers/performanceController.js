const PerformanceData = require('../models/performance')
const { Op } = require('sequelize')

exports.add = function (data, callback) {
    let {browser, name, platform, timeStamp} = data
    let dataString = JSON.stringify(data.data)
    PerformanceData.create({browser, name, platform, timeStamp, data: dataString})
}

exports.getData = async function(data, callback) {
    let {start, end} = data
    let list = await PerformanceData.findAll({
        where: {
            timeStamp: {
                [Op.gte]: start,
                [Op.lte]: end
            },
        },
        attributes: [
            'name',
            'data',
        ],
        raw: true,
    })
    let fp = 0, fcp = 0, dns = 0, domReady = 0, domParse = 0, tcp = 0
    let fpCnt = 0, fcpCnt = 0, NavigationCnt = 0
    list.forEach(item => {
        if(item.name === 'first-paint') {
            fp += JSON.parse(item.data).time
            fpCnt++
        }else if(item.name === 'first-contentful-paint') {
            fcp += JSON.parse(item.data).time
            fcpCnt++
        }else if(item.name === 'NavigationTimeData') {
            let tmp = JSON.parse(item.data)
            NavigationCnt++
            dns += tmp.dns
            domReady += tmp.domReady
            domParse += tmp.domParse
            tcp += tmp.tcp
        }
    })
    fp /= fpCnt
    fcp /= fcpCnt
    dns /= NavigationCnt
    domReady /= NavigationCnt
    domParse /= NavigationCnt
    tcp /= NavigationCnt
    callback({fp, fcp, dns, domReady, domParse, tcp})
}