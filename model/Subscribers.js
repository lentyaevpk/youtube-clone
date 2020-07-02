const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const SubscribersSchema = new Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

module.exports = Subscribers = mongoose.model('Subscribers', SubscribersSchema);