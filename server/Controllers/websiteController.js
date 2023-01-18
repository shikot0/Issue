const Websites = require('../Models/websiteModel');

module.exports.registerWebsite = async (req, res, next) => {
    try {
        const {registeredBy, websiteName, domains, primaryContact, secondaryContact} = req.body;
        const websiteCheck = await Websites.findOne({queryName: websiteName.toLowerCase()});

        if(websiteCheck) {
            return res.json({status: 400, msg: 'A website has already been registered with that name, please choose another.'})
        }else {
            const website = await Websites.create({
                registeredBy,
                name: websiteName,
                queryName: websiteName.toLowerCase(),
                domains,
                primaryContact,
                secondaryContact,
                dateOfCreation: new Date().toDateString()
            })
            return res.json({status: 200, msg: 'Your Website was successfully registered!', id: website._id})
        }
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
        const website = await Websites.findOne({queryName: name.toLowerCase()}).select([
            "_id",
            "name",
            "domains",
            "queryName",
            "numberOfIssues",
            "registeredBy"
        ]);

        if(website) {
            return res.json(website);
        }else {
            return res.json({noWebsite: true})
        }
    } catch(err) {
        next(err);
    }
}

module.exports.getAllWebsites = async (req, res, next) => {
    try {
        const websites = await Websites.find().select([
            "_id",
            "name",
            "queryName",
            "numberOfIssues",
            "domains"
        ]).sort({name: 1}); 

        if(websites) {
            return res.json(websites)
        }else {
            return res.json({noWebsites: true})
        }
    } catch(err) {
        next(err)
    }
}