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
        // description: {
        //     type: String,
        //     required: true,
        //     min: 10,
        //     max: 300
        // },
        name: {
            type: String,
            required: true,
            trim: true,
            min: 5,
            max: 50
        },
        queryName: {
            type: String,
            required: true,
            trim: true,
            min: 5,
            max: 50
        },
        domains: {
            type: Array,
            trim: true,
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
            trim: true,
            required: true
        },
        secondaryContact: {
            type: String,
            trim: true,
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