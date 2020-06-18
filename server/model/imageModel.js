const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('image', imagesSchema)