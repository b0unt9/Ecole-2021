const mongoose = require('mongoose');

let memberSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        index: true
    }
})

module.exports = mongoose.model('member', memberSchema);