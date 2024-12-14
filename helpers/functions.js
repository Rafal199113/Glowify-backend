const { transporter } = require('../config/mail');

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'Glowify@o2.pl', // Nadawca
            to,// Odbiorca
            subject, // Temat wiadomości
            text, // Treść w formacie tekstowym
            html: `<p>${text}</p>`, // Opcjonalnie wiadomość HTML
        });

        console.log('E-mail wysłany:', info.messageId);
    } catch (error) {
        console.error('Błąd podczas wysyłania e-maila:', error);
    }
};

const generateFiveDigitNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

module.exports = {
    sendEmail,
    generateFiveDigitNumber
}