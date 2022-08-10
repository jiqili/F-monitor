const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const UserData = sequelize.define(
    'userdata',
    {
        time: {
            type: DataTypes.INTEGER
        },
        path: {
            type: DataTypes.STRING,
        },
        device: {
            type:DataTypes.STRING,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
) 
module.exports = UserData