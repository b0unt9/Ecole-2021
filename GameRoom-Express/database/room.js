const mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true
    },
    members: [{
        type: String,
    }],
    game: {
        type: String
    },
    tier: {
        type: String
    },
    fcm: {
        type: String,
        required: true
    },
    activate: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('room', roomSchema);
