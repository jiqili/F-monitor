const Sequelize = require('sequelize')

const sequelize = new Sequelize('monitor','root','123456', {
    host: 'localhost',
    // host: '110.42.183.227',
    dialect: 'mysql',
    timezone: '+08:00'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// sequelize.sync({force: true});
sequelize.sync();
module.exports = sequelize