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
        targetWebsite.numberOfIssues = await Issues.count({"website.name": targetWebsite.queryName})

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
        return res.json({msg:'Your issue was successfully created!', status: true});
    } catch(err) {
        next(err)
    }
}

module.exports.deleteIssue = async (req, res, next) => {
    try {
        const id = req.params.id;
        const issue = await Issues.findOne({_id:id});
        if(issue) {
            const targetWebsite = await Websites.findOne({_id: issue.website.id});
            await Issues.deleteOne({_id:id});
            targetWebsite.numberOfIssues = await Issues.count({"website.name": targetWebsite.queryName})
            await targetWebsite.save();
            res.json({status: 200, msg: 'Issue has been deleted'});
        }else {
            res.json({status: 400, msg: 'There has been an error please try again'});
        }
    } catch(err) {
        next(err);
    }
}

module.exports.resolveIssue = async (req, res, next) => {
    try {
        const id = req.params.id;
        const issue = await Issues.findOne({_id: id});

        if(!issue.resolved) {
            issue.resolved = true;
            const user = await Users.findOne({_id: issue.openedBy.id});
            if(user.notifications.length >= 8) {
                user.notifications.splice(0,1, {issueId: issue._id, msg: `One of the admins of ${issue.website.name} has marked an issue you reported as resolved.`, seen: false})
            }else {
                user.notifications.push({issueId: issue._id, msg: `One of the admins of ${issue.website.name} has marked an issue you reported as resolved.`, seen: false})
            }
            await user.save();
            await issue.save();
            return res.json({msg: 'Successfully closed issue!', resolved: true})
        }else {
            issue.resolved = false;
            await issue.save();
            return res.json({msg: 'Successfully reopened issue!', resolved: false})
        }

    } catch(err) {
        next(err);
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

        if(issue) {
            return res.json(issue);
        }else {
            return res.json({noIssue: true})
        }
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
        
        if(issues) {
            return res.json(issues);
        }else {
            return res.json({noIssues: true})
        }
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
            issues = await Issues.find({"openedBy.username": user.username}).select([
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
            ]).sort({attests: -1})
        }
        
        if(issues) {
            return res.json(issues)
        }else {
            return res.json({noIssues: true})
        }
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
        ]).sort({createdAt: -1});
        // console.log(issues) 
        if(issues) {
            return res.json(issues)
        }else {
            return res.json({noIssues: true})
        }
    }catch(err) {
        next(err)
    }
}