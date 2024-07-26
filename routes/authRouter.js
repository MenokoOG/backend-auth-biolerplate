const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')

// Signup route
authRouter.post('/signup', authController.signup)

// Login route
authRouter.post('/login', authController.login)

module.exports = authRouter
