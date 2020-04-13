const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String
    },
    profileName: {
        type: String
    },
    ratings: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    hashtags: {
        type: Array
    },
    cityId: {
        type: String,
        required: true
    },
    activities: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('itinerary', itinerarySchema)