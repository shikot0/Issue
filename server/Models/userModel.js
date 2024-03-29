const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 50
    },
    notifications: {
        type: Array,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    resolvedIssues: {
        type: Number,
        default: 0
    },
    profilePicture: {
        Data: Buffer,
        ContentType: String
    }
});


module.exports = mongoose.model('Users', userSchema)