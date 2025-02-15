const { User, UserWaterHistory } = require('../models/User');
const express = require('express');
const router = express.Router();
const sequelize = require('../database');
const bcrypt = require('bcryptjs');

router.put('/api/userWaterHistory', async (req, res) => {
    const transaction = await sequelize.transaction();
    const date = new Date();
    const { user_id, drankWaterAmount } = req.body;

    UserWaterHistory.update({ drankWaterAmount }, { where: { user_id, date } })
        .then(async (data) => {
            await transaction.commit();
            res.json({ message: 'User updated successfully' });
        })
        .catch(async error => {
            console.error(error);
            await transaction.rollback();
            res.status(500).json({ message: 'An error occurred during the update' });
        })
});


router.post('/api/getDay', async (req, res) => {
    const transaction = await sequelize.transaction();
    const date = new Date();
    const { user_id, data } = req.body;

    UserWaterHistory.update({ drankWaterAmount }, { where: { user_id, data } })
        .then(async (data) => {
            console.log(data)
            await transaction.commit();
            res.json({ day: data });
        })
        .catch(async error => {
            console.error(error);
            await transaction.rollback();
            res.status(500).json({ message: 'An error occurred during the update' });
        })
});

router.post('/api/userWaterHistory', async (req, res) => {
    const transaction = await sequelize.transaction();
    const date = new Date();
    const { user_id } = req.body;
    UserWaterHistory.findOne({ where: { user_id, date } })
        .then(async (data) => {
            if (data) {
                var drank = await UserWaterHistory.sum('drankWaterAmount', { where: { user_id } })
                res.json({ day: data, drank: drank });
            } else {
                const date = new Date();
                const { id } = req.body;

                await UserWaterHistory.create({ user_id: user_id, date: date, drankWaterAmount: 0 }).then((day) => {
                    day.save().then((day) => {
                        res.json({ day: day });
                    })
                });
            }
            await transaction.commit();
        })
        .catch(async error => {
            console.log("sdfsdf")
            console.error(error);
            await transaction.rollback();
            res.status(500).json({ message: 'An error occurred during the update' });
        })
});

module.exports = router;