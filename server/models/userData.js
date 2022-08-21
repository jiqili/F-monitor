const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const UserData = sequelize.define(
    'userdata',
    {
        timeStamp: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
        },
        user: {
            type: DataTypes.STRING,
        },
        platform: {
            type: DataTypes.STRING
        },
        browser: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
) 
module.exports = UserData