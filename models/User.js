const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Wskazujemy na połączenie z bazą danych

// Definiowanie modelu User
class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
        allowNull: false,
        unique: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skinType: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    hairType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    resetCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    waterAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    waterBackgroundFile: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "1"
    },
    waterCharacterFile: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "1"
    },
    glassAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 250
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
});

// Definiowanie modelu UserWaterHistory
class UserWaterHistory extends Model { }

UserWaterHistory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    drankWaterAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'UserWaterHistory',
    tableName: 'UserWaterHistories',
    timestamps: true,
});


UserWaterHistory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(UserWaterHistory, { foreignKey: 'user_id', as: 'waterHistory' });


module.exports = { User, UserWaterHistory };