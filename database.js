const { Sequelize } = require('sequelize');

// Konfiguracja połączenia z bazą PostgreSQL
const sequelize = new Sequelize('Glowify', 'postgres', 'secret', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5435
});

module.exports = sequelize;