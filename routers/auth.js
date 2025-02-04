const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendEmail, generateFiveDigitNumber } = require('../helpers/functions')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secretKey = 'mySuperSecretKey';

router.post('/auth/passwordReset', async (req, res) => {

    const { email } = req.body;

    console.log(email)
    await User.findOne({ where: { email } }).then(async (user) => {
        if (user) {
            const resetCode = generateFiveDigitNumber()
            user.resetCode = resetCode;
            sendEmail(user.email, 'Reset hasła dla dla: ' + user.username, 'Twój kod do resetowania hasła to: ' + resetCode);
            user.save();
            res.status(200).json({ "message": "emailSended", })
        } else {

            res.status(404).json({ "message": "userNotFound" })
        }


    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "message": "deleted" })
    });
});

router.post('/auth/confirmCode', async (req, res) => {

    const { resetCode } = req.body;
    await User.findOne({ where: { resetCode } }).then((user) => {
        if (user) {
            res.status(200).json({ "message": "codeConfirmed", "id": user.id })
        } else {
            console.log('dfdf')
            res.status(404).json({ "message": "wrongCode" });
        }


    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "message": "wrongCode" })
    });
});

router.post('/auth/updatePassword', async (req, res) => {

    const { id, password } = req.body;

    const updates = { password };
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
    }
    await User.update(updates, { where: { id } }).then(() => {
        console.log("updated")
        res.status(200).json({ "message": "passwordUpdated" })
    });

});

router.get('/auth/athenticate', async (req, res) => {

    const token = req.headers['authorization']?.split(' ')[1]; // Odbierz token z nagłówka Authorization

    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid or expired token');
        }

        try {

            let id = decoded.userId;

            await User.findOne({ where: { id } }).then((user) => {
                if (!user) {
                    return res.status(404).send('User not found');
                }
                console.log(user)
                return res.json({
                    user: user
                });
            });



        } catch (error) {
            console.log(error)
            res.status(500).send('Server error');
        }
    });

});

router.post('/auth/login', async (req, res) => {

    const { email, password } = req.body;

    await User.findOne({ where: { email } }).then(async (user) => {
        if (!user) {
            return res.sendStatus(404);
        }
        console.log(req.body);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.sendStatus(401);
        }

        const payload = {
            userId: user.id
        };

        const token = jwt.sign(payload, secretKey);

        return res.json({
            user: user,
            token: token
        });


    }).catch((error) => {
        res.json(error)
    });

});
module.exports = router;