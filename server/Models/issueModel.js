const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        openedBy: {
            type: Object,
            required: true
        },
        website: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        attests: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
            min: 10,
            max: 500
        },
        link: {
            type: String,
            required: true,
        },
        screenshot: {
            Data: Buffer,
            ContentType: String
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