const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        openedBy: {
            type: String,
            required: true
        },
        // website: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'website',
        //     required: true
        // },
        name: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        description: {
            type: String,
            required: true,
            min: 10,
            max: 300
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