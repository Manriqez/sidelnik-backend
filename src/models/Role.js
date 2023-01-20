const { model, Schema } = require('mongoose')

const schema = new Schema({
    value: {
        type: String,
        unique: true,
        default: 'USER'
    },
})

module.exports = model('Role', schema)