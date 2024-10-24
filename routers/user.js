// routes/users.js
const express = require('express');
const router = express.Router();

// Przykładowe trasy dla użytkowników
router.get('/', (req, res) => {
    res.send('Users list');
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User details for user ID: ${userId}`);
});

module.exports = router;