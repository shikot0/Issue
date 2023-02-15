const Websites = require('../Models/websiteModel');
const Users = require('../Models/userModel');
const jwt = require('jsonwebtoken');

module.exports.registerWebsite = async (req, res, next) => {
    try {
        const {registeredBy, websiteName, domains, admins, primaryContact, secondaryContact} = req.body;
        const websiteCheck = await Websites.findOne({queryName: websiteName.toLowerCase()});

        if(websiteCheck) {
            return res.json({status: 400, msg: 'A website has already been registered with that name, please choose another.'})
        }else {
            const website = await Websites.create({
                registeredBy,
                name: websiteName,
                queryName: websiteName.toLowerCase(),
                domains,
                admins,
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
        const website = await Websites.findOne({_id: id}); 
        res.setHeader('Content-Type', website.websiteImage.ContentType)
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
            "admins",
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
            "admins",
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

module.exports.editWebsite = async (req, res, next) => {
    try {
        const {admins} = req.body;
        const id = req.params.id;
        const accessToken = req.headers["x-access-token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await Users.findOne({email: decoded})
        const website = await Websites.findOne({_id: id});

        if(website.admins.some(admin => admin.username === user.username)) {
            website.admins = admins;
            await website.save();
            return res.json({status: 200, msg: 'Successfully edited website admins'})
        }else {
            return res.json({status: 400, msg: 'You do not have permission to edit this website'})
        }
    } catch(err) {
        next(err);
    }
}