const { Sequelize } = require('sequelize');

// Konfiguracja połączenia z bazą PostgreSQL
const sequelize = new Sequelize('verceldb', 'default', 'EDzZtclu6M3p', {
    host: 'ep-steep-rice-64178939-pooler.us-east-1.aws.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Ustaw na false, jeśli certyfikat SSL jest self-signed
        }
    }
});

module.exports = sequelize;