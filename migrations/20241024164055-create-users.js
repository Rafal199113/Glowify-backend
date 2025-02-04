'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skinType: {
        type: Sequelize.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      hairType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resetCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      waterAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      waterBackgroundFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      waterCharacterFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      glassAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 250
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
