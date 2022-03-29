const Controllers = require('../controllers/controllers')

const userRouter = require('express').Router()

userRouter.post('/users', Controllers.register)
userRouter.post('/login', Controllers.login)

module.exports = userRouter