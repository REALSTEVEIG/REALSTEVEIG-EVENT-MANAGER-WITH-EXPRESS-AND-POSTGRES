const Sequelize = require('sequelize');
const connectDB = require('../db/connect')

const User = connectDB.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        isEmail: true, //checks for email format
        allowNull: false,
        unique: {
            args:true,
            msg: 'Email address already in use!'
        }
    },

    status : {
        type : Sequelize.ENUM,
        values : ['Pending Approval', 'Approved', 'Rejected', 'Suspended'],
        defaultValue : 'Pending Approval'
    }
});

module.exports = User