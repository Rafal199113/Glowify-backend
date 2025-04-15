const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.poczta.onet.pl', // Adres serwera SMTP dla o2
    port: 465, // Port SMTP (z SSL)
    secure: true, // Użyj SSL (secure: true dla portu 465)
    auth: {
        user: 'rafal.sieczkowski@onet.eu', // Twój adres e-mail na o2
        pass: '@BH8%Hs,cM', // Twoje hasło do konta
    },
    tls: {
        rejectUnauthorized: false, // Wyłączenie weryfikacji certyfikatu
    },
});

module.exports = {
    transporter
}