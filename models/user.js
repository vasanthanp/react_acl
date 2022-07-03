const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

module.exports = model('user',userSchema)