const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
        openedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // company: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Company',
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
        screenshot: {
            Data: Buffer,
            ContentType: String
        },
        resolved: {
            type: Boolean,
            default: false,
        }
    }, {
        timestamps: true,
    }
    );


module.exports = mongoose.model('Issues', issueSchema)