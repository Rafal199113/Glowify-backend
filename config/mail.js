const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'poczta.o2.pl', // Adres serwera SMTP dla o2
    port: 465, // Port SMTP (z SSL)
    secure: true, // Użyj SSL (secure: true dla portu 465)
    auth: {
        user: 'Glowify@o2.pl', // Twój adres e-mail na o2
        pass: 'Glowify2024@-reset', // Twoje hasło do konta
    },
    tls: {
        rejectUnauthorized: false, // Wyłączenie weryfikacji certyfikatu
    },
});

module.exports = {
    transporter
}