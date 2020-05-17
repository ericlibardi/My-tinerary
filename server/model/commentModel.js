const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    cityId: {
        type: String,
        required: true,
    },
    itineraryId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comment', commentSchema)