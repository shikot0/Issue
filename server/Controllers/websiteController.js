const Websites = require('../Models/websiteModel');

module.exports.registerWebsite = async (req, res, next) => {
    try {
        const {registeredBy, websiteName, domains, primaryContact, secondaryContact} = req.body;
        const website = await Websites.create({
            registeredBy,
            name: websiteName,
            domains,
            primaryContact,
            secondaryContact,
            dateOfCreation: new Date().toDateString()
        })
        res.json({status: 200, msg: 'Your Website was successfully registered!', id: website._id})
    } catch(err) {
        next(err);
    }
}

module.exports.setWebsiteImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {data, mimetype} = req.files.fileupload;
        const website = await Websites.findOne({_id: id})
        website.websiteImage.Data = data;
        website.websiteImage.ContentType = mimetype; 

        await website.save();
        return res.json({status: 200});
    } catch(err) {
        next(err)
    }
}

module.exports.websiteImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        // console.log(id)
        const website = await Websites.findOne({_id: id}); 
        res.type('Content-Type', website.websiteImage.ContentType)
        return res.status(200).send(website.websiteImage.Data)
    } catch(err) {
        next(err)
    }
}

module.exports.getWebsite = async (req, res, next) => {
    try {
        const name = req.params.name;
        const website = await Websites.findOne({name: name.toLowerCase()}).select([
            "_id",
            "name",
            "domains",
            "issues",
            "registeredBy"
        ])
        // console.log(website)
        return res.json(website);
    } catch(err) {
        next(err);
    }
}

module.exports.getAllWebsites = async (req, res, next) => {
    try {
        const websites = await Websites.find().select([
            "_id",
            "name",
            "issue",
            "domains"
        ]); 
        return res.json(websites)
    } catch(err) {
        next(err)
    }
}