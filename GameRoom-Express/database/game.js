const mongoose = require('mongoose');

let gameSchema = new mongoose.Schema({
    code: {
        index: true,
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    member: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('game', gameSchema);