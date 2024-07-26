const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const connectToDb = require('./config/db')

app.use(express.json())
app.use(morgan('dev'))

// Connect to the database
connectToDb()

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
