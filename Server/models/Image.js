const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({

    name: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    status: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    uName: {
        type: String
    },
    imgPath: {
        type: String
    },
    base64img: {
        type: String
    }
})
module.exports = mongoose.model('images', ImageSchema)