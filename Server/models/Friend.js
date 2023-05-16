const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FriendSchema = new Schema({

    friendAdd: {
        type: Boolean
    },
    frname: {
        type: String,
    },
    frId: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }


})

module.exports = mongoose.model('friends', FriendSchema)