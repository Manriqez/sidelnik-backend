const genericCrud = require('./generic.controller')
const { Category } = require('../models')

module.exports = {
    ...genericCrud(Category)
}