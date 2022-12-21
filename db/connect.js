const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.POSTGRESQL_NAME, 
    process.env.POSTGRESQL_ADMIN,
    process.env.POSTGRESQL_PASSWORD, {
    host :  process.env.POSTGRESQL_DB_HOST,
    dialect : 'postgres'
})

module.exports = sequelize