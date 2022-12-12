const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
        suggestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            min: 5,
            max: 30,
        },
        description: {
            type: String,
            min: 10,
            max: 300,
        }
    }, {
        timestamps: true,
    }

)

