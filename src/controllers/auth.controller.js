const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

// const generateAccessToken = (id, roles) => {
//     const payload = {
//         id,
//         roles
//     }
//     return jwt.sign(payload, secret, {expiresIn: '24h'})
// }

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(200).json(errors)
            }
            const { username, password } = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(200).json({errors: [{ msg: 'Пользователь с таким именем уже существует' }]})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            // const user = new User({username, password: hashPassword})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (error) {
            console.error(error)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                // return res.status(400).json({message: `Пользователь ${username} не найден`})
                return res.status(200).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(200).json({message: `Введён неверный пароль`})
            }
            // const token = generateAccessToken(user._id, user.roles)
            const token = generateAccessToken(user._id)
            return res.status(200).json({token})
        } catch (error) {
            console.error(error)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUserData(req, res) {
        try {
            if(!req.user) {
                return res.status(400).json({message: 'Ошибка авторизации'})
            } else {
                const id = req.user.id
                const userData = await User.findById(id)
                return res.json(userData)
            }
        } catch (error) {
            console.error(error)
            res.status(400).json({message: 'user data error'})
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.error(error)
            res.status(400).json({message: 'getUsers error'})
        }
    }
}

module.exports = new authController()