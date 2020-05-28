const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    reply: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    },
    commentId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('reply', replySchema)