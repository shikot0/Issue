const Users = require('../Models/userModel');
const Issues = require('../Models/issueModel');
const Websites = require('../Models/websiteModel');

module.exports.createIssue = async (req, res, next) => {
    try {
        const {openedBy, name, link, description, website} = req.body;
        const issue = await Issues.create({
            openedBy, 
            name,
            description, 
            website,
            link,
            dateOfCreation: new Date().toDateString()
        });
        const targetWebsite = await Websites.findOne({_id: website.id});
        targetWebsite.numberOfIssues = targetWebsite.numberOfIssues+1;

        await targetWebsite.save();
        return res.json({status: true, id: issue._id});
    } catch(err) {
        next(err);
    }
}

module.exports.setIssueScreenshot = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {data, mimetype} = req.files.fileupload;
        const issue = await Issues.findOne({_id: id})
        issue.screenshot.Data = data;
        issue.screenshot.ContentType = mimetype; 

        await issue.save();
        return res.json({msg:'Your issue was successfully created!',status: true});
    } catch(err) {
        next(err)
    }
}

module.exports.attestIssue = async (req, res, next) => {
    try {
        const id = req.params.id;
        const action = req.params.action;
        const issue = await Issues.findOne({_id: id});
        if(issue && action === 'attest') {
            issue.attests = issue.attests+1;
            issue.save();
        } else if(issue && action === 'removeattest') {
            issue.attests = issue.attests-1;
            issue.save();
        }else {
            return res.json('error');
        }
        return res.json('successful')
    } catch(err) {
        next(err);
    }
}

module.exports.editIssue = async (req, res, next) => {
    try {
        const {id, name, link, description} = req.body;
        console.log(id, name, link, description)
        const issue = await Issues.findOne({_id: id});

        issue.name = name;
        issue.link = link;
        issue.description = description;
        await issue.save();
        return res.json({status: 200, msg: 'Successfully edited issue'})
    } catch(err) {
        next(err);
    }
}

module.exports.getIssueScreenshot = async (req, res, next) => {
    try {   
        const id = req.params.id;
        const issue = await Issues.findOne({_id: id}); 
        res.type('Content-Type', issue.screenshot.ContentType)
        return res.status(200).send(issue.screenshot.Data)
    } catch(err) {
        next(err);
    }
}

module.exports.getIssue = async (req, res, next) => {
    try {   
        const id = req.params.id;
        const issue = await Issues.findOne({_id: id}).select([
            "_id",
            "openedBy",
            "website",
            "attests",
            "name",
            "description",
            "resolved",
            "link",
            "dateOfCreation"
        ]);
        // console.log(issue)
        return res.json(issue);
    } catch(err) {
        next(err);
    }
}

module.exports.getIssuesFromWebsite = async (req, res, next) => {
    try {
        const name = req.params.name;
        const issues = await Issues.find({"website.name": name}).select([
            "_id",
            "openedBy",
            "website",
            "attests",
            "name",
            "description",
            "resolved",
            "link",
            "dateOfCreation"
        ]);
        return res.json(issues);
    } catch(err) {
        next(err);
    }
}

module.exports.getAllIssues = async (req, res, next) => {
    try {
        const username = req.params.username.toLowerCase();
        const user = await Users.findOne({username: username}); 
        let issues;
        if(user) {
            issues = await Issues.find({openedBy: user.username}).select([
                "openedBy",
                "name",
                "description",
                "attests",
                "website",
                "link",
                "resolved"
            ])
        }else if(username === 'all') {
            issues = await Issues.find().select([
                "openedBy",
                "name",
                "description",
                "attests",
                "website",
                "link",
                "resolved"
            ])
        }
        return res.json(issues)
    } catch(err) {
        next(err)
    }
}

module.exports.getLatestIssues = async(req, res, next) => {
    try {
        let currentDate = new Date().toDateString();
        let issues = await Issues.find({dateOfCreation: currentDate}).select([
            'name',
            'description',
            'website',
            'attests',
            'resolved',
            "link",
            'openedBy'
        ]);
        // console.log(issues) 
        // if(issues.length !== 0) {
        //     res.json(issues)
        // }else {
        //     res.json({msg:'No issues'})
        // }
        res.json(issues)
    }catch(err) {
        next(err)
    }
}