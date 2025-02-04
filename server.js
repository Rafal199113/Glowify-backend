const express = require('express');
const cors = require('cors');
const sequelize = require('./database');


const PORT = process.env.PORT || 3050;
const app = express();

app.use(express.json());
app.use(cors());

sequelize.sync();

const authRoutes = require('./routers/auth');
const fileRoutes = require('./routers/file');
const userRoutes = require('./routers/user');
const userWaterHistoryRoutes = require('./routers/userWaterHistory');

app.use('/', authRoutes);
app.use('/', fileRoutes);
app.use('/', userRoutes);
app.use('/', userWaterHistoryRoutes);

app.listen(PORT, () => {
    console.log('Serwer działa na porcie ' + PORT);
});

