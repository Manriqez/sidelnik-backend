const router = require('express').Router()
const { auth } = require('../controllers')
const { check } = require('express-validator')
const userDataMiddleware = require('../middleware/userData.middleware')
// const roleMiddleware = require('./midleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен иметь больше 4 и меньше 10 символов').isLength({min:4, max:10})
], auth.registration)

router.post('/login', auth.login)

router.post('/userData', userDataMiddleware, auth.getUserData)

// router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

router.get('/users', auth.getUsers)

module.exports = router
