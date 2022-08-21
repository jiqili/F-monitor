const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const PerformanceData = sequelize.define(
    'performancedata',
    {
        timeStamp: {
            type: DataTypes.STRING
        },
        platform: {
            type: DataTypes.STRING
        },
        browser: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.TEXT
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
) 
module.exports = PerformanceData