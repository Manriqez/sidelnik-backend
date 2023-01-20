const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token || token === 'null') {
            return res.json({message: 'Пользователь не авторизован'})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (error) {
        console.error(error)
        return res.status(200).json({message: 'Пользователь не авторизован'})
    }
}