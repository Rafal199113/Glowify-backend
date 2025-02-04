const schedule = require('node-schedule');

const checkIfNewDay = () => {
    schedule.scheduleJob('0 0 * * *', () => {
        console.log('Nowyb dzień!');
    });
}

module.exports = {
    checkIfNewDay,
}