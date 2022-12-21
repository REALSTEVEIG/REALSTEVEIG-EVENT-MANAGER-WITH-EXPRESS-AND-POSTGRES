const Sequelize = require('sequelize');
const connectDB = require('../db/connect')

const Admin = connectDB.define('Admin', {
    email: {
        type: Sequelize.STRING,
        isEmail: true, //checks for email format for the admin
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Admin