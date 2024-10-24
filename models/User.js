const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Model użytkownika
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
});

module.exports = User;