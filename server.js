const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan= require('morgan');
require('dotenv').config();
const {expressjwt} = require("express-jwt");
const connectToDb = require('./config/db');
const authRoutes = require('./routes/authRouter')

app.use(express.json());
app.use(morgan('dev'));

connectToDb();

app.use('/api/auth', authRoutes);
// app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
// app.use('/api/main/issues', require("./routes/issueRouter"))
// app.use('/api/main/comments', require("./routes/commentRouter"))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});