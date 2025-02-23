const express = require('express');
const router = express.Router();
const fs = require('fs');
const { User } = require('../models/User');
const upload = require('../files/multer')
const { send } = require('process');
const { where } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');

router.post('/api/checkIfExists', async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'userExists' });
    }
    else {
        return res.status(200).json({ message: 'notExists' });
    }
});

router.post('/api/users', async (req, res) => {

    try {
        const { email, username, password, gender, skinType, hairType } = req.body.user;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'userExists' });
        }

        console.log(req.body.user);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            gender,
            skinType,
            hairType,
        });
        console.log(newUser)
        return res.status(200).json({ message: 'userCreated', user: newUser });
    } catch (error) {
        console.error("Error occurred:", error); // Log any error
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }

});




router.post('/api/user/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const { username, password, email, hairType, skinType, waterAmount, waterBackgroundFile, waterCharacterFile, glassAmount } = req.body;
        console.log(req.body)
        const updates = { username, email, hairType, skinType, waterAmount, waterBackgroundFile, waterCharacterFile, glassAmount };

        for (const key in updates) {
            if (updates[key] === null || updates[key] === undefined) {
                delete updates[key];
            }
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        const [updatedRowsCount] = await User.update(updates, { where: { id } });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during the update' });
    }
});

router.post('/user/avatar/update', upload.single('profilePicture'), async (req, res) => {

    try {
        res.sendStatus(200)
    } catch (err) {
        console.error(err);
        await res.sendStatus(500);
    }
});

router.delete('/api/delete/:id', async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    await User.findOne({ where: { id } }).then(async (user) => {
        fs.rmSync("./files/" + id, { recursive: true, force: true });
        await user.destroy()
    }

    ).then(() => {
        res.status(200).json({ "message": "deleted" })

    }).catch(() => {

        res.status(500).json({ "message": "deleted" })
    });




});

module.exports = router;