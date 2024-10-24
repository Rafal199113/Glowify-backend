const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');
const router = express.Router();
const PORT = process.env.PORT || 3050;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const usersRouter = require('./routers/user');


// Połączenie z bazą danych
sequelize.sync();


app.post('/api/users', async (req, res) => {


    console.log(req.body)
    const { username, password, email } = req.body;

    // Sprawdź, czy użytkownik już istnieje
    const existingUser = await User.findOne({ where: { email } });
    console.log(existingUser)
    if (existingUser) {
        return res.status(400).json({ message: 'Użytkownik już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email: email, password: hashedPassword });

    res.status(201).json({ message: 'Użytkownik dodany pomyślnie', user: newUser });
});

// Endpoint do logowania
app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
        return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
    }

    // Generowanie tokena JWT
    const token = jwt.sign({ id: user.id, role: user.role }, 'tajny_klucz', {
        expiresIn: '1h',
    });

    res.json({ token });
});


// Endpoint do edycji danych użytkownika
app.put('/api/users/:id', async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Brak uprawnień');
    }

    const { id } = req.params;
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.update(
        { username, password: hashedPassword },
        { where: { id } }
    );

    res.json({ message: 'Dane zaktualizowane pomyślnie', updatedUser });
});

app.listen(PORT, () => {
    console.log('Serwer działa na porcie 3000');
});