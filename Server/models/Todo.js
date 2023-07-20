const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TodoSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    todo: {
        type: String,
        required: true,
    },
    location: {
        type: String,

    },
    time: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})
module.exports = mongoose.model('todos', TodoSchema)