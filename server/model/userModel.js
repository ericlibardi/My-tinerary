const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    oAuth: {
        required: false
    },
    password: {
        type: String,
        required: function validate() {
            if (this.oAuth) {
                return false;
            } else {
                return true;
            }
        }
    },
    image: {
        type: String
    },
    logedin: {
        type: Boolean
    },
    itineraries: {
        type: Array
    }
})

module.exports = mongoose.model('users', userSchema)