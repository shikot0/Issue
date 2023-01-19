const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema(
    {
        registeredBy: {
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
        queryName: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        // description: {
        //     type: String,
        //     required: true,
        //     min: 10,
        //     max: 300
        // },
        domains: {
            type: Array,
            required: true
        },
        admins: {
            type: Array,
            required: true
        },
        numberOfIssues: {
            type: Number,
            default: 0,
            min: 0
        },
        websiteImage: {
            Data: Buffer,
            ContentType: String
        },
        primaryContact: {
            type: String,
            required: true
        },
        secondaryContact: {
            type: String,
            required: true
        },
        dateOfCreation: {
            type: Date,
            required: true
        }
    }, {
        timestamps: true
    }
);


module.exports = mongoose.model('Websites', websiteSchema)