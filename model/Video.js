const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: String,
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })

module.exports = Video = mongoose.model('Video', videoSchema)