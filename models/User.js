const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
class User extends Model { }
// Model użytkownika
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    skinType: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        unique: true
    },
    hairType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Upewnij się, że jest to poprawna nazwa tabeli
    timestamps: true // Automatycznie dodaje createdAt i updatedAt
});

module.exports = User;