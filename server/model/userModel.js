const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model('users', userSchema)