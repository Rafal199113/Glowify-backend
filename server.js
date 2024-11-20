const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');

const PORT = process.env.PORT || 3050;
const app = express();
app.use(express.json());
app.use(cors());




sequelize.sync();


app.post('/api/checkIfExists', async (req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'userExists' });
    }
    else {
        return res.status(200).json({ message: 'notExists' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { email, username, password, gender, skinType, hairType } = req.body.user;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'userExists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            gender,
            skinType,
            hairType
        });
        return res.status(201).json({ message: 'userCreated', user: newUser });
    } catch (error) {
        console.error("Error occurred:", error); // Log any error
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }

});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Znalezienie użytkownika w bazie danych
    await User.findOne({ where: { email } }).then(async (user) => {
        if (!user) {
            return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
        }

        // Sprawdzenie poprawności hasła
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
        }

        // Generowanie tokena JWT
        const token = jwt.sign({ id: user.id, role: user.email }, 'tajny_klucz', {
            expiresIn: '1h',
        });


        res.json({         // Użycie dynamicznej wartości
            user: user,  // Użycie dynamicznej wartości   // Użycie dynamicznej wartości
            token: token,
        });


    }).catch(() => {

    });

    // Sprawdzenie, czy użytkownik istnieje

});

app.put('/api/users/:id', async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    console.log(id)
    const { username, password, email, hairType, skinType } = req.body.user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.update(
        { username, hashedPassword, email, hairType, skinType },
        { where: { id } }
    );

    res.json({ message: 'userUpdated' });
});

app.listen(PORT, () => {
    console.log('Serwer działa na porcie' + PORT);
});

module.exports = app;