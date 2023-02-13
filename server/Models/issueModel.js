const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        openedBy: {
            type: Object,
            required: true
        },
        website: {
            type: Object,
            trim: true,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            min: 5,
            max: 50
        },
        attests: {
            type: Number,
            trim: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            min: 10,
            max: 500
        },
        link: {
            type: String,
            required: true,
        },
        screenshots: [{
            Data: Buffer,
            ContentType: String,
            default: {}
        }],
        numberOfScreenshots: {
            type: Number,
            min: 0,
            max: 4,
            default: 0
        },
        resolved: {
            type: Boolean,
            default: false,
        },
        dateOfCreation: {
            type: Date,
            required: true, 
        }
    }, {
        timestamps: true,
    }
);


module.exports = mongoose.model('Issues', issueSchema)