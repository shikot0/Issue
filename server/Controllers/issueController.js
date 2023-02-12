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

module.exports.setIssueScreenshots = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.files.fileupload;
        // console.log(data)
        const issue = await Issues.findOne({_id: id});
        
        if(data && Array.isArray(data)) {
            let counter = 0;
            for(screenshot of data) {
                if(screenshot) {
                    // issue.screenshots[counter] = {Data: screenshot.data, ContentType: screenshot.mimetype};
                    issue.screenshots.push({Data: screenshot.data, ContentType: screenshot.mimetype});
                    // console.log(data)
                    console.log(screenshot)
                    // issue.screenshots[counter].Data = screenshot.data
                    // issue.screenshots[counter].ContentType = screenshot.mimetype;
                }
                counter++;
            }
            issue.numberOfScreenshots = counter;
        }else if(data) {
            issue.screenshots = {Data: data.data, ContentType: data.mimetype};
            issue.numberOfScreenshots = 1;
        }

        await issue.save();
        return res.json({msg:'Your issue has successfully been created!', status: true});
    } catch(err) {
        next(err)
    }
}

module.exports.getIssueScreenshots = async (req, res, next) => {
    try {   
        const id = req.params.id;
        const imageNumber = req.params.number;
        const issue = await Issues.findOne({_id: id}); 

        if(issue && !imageNumber) {
            return res.status(200).send(issue.screenshots);
        }else if(issue.screenshots && issue.numberOfScreenshots !== 0 && imageNumber >= 0 && imageNumber <= issue.numberOfScreenshots-1) {
            let screenshot = issue.screenshots[imageNumber];
            return res.status(200).send(screenshot.Data);
        }else {
            return res.status(400).json({msg: 'There has been an error, please try again'})
        }
    } catch(err) {
        next(err);
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
            "numberOfScreenshots",
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
            "numberOfScreenshots",
            "dateOfCreation"
        ]);
        
        if(issues && issues !== [] && issues.length > 0) {
            return res.json(issues);
        }else {
            return res.json({noIssues: true})
        }
    } catch(err) {
        next(err);
    }
}

module.exports.getAllIssuesFromUser = async (req, res, next) => {
    try {
        const username = req.params.username.toLowerCase();
        let user;
        let issues; 

        if(username) {
            user = await Users.findOne({username: username});
            if(user && username) {
                issues = await Issues.find({"openedBy.username": user.username}).select([
                    "openedBy",
                    "name",
                    "description",
                    "attests",
                    "website",
                    "dateOfCreation",
                    "link",
                    "numberOfScreenshots",
                    "resolved"
                ]);
            } 
        }

        if(issues && issues !== [] && issues.length > 0) {
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
        let page = req.params.page;
        let issues;
        let returnedIssues;
        page = page -1;
        
        issues = await Issues.find({resolved: false}).select([
            "openedBy",
            "name",
            "description",
            "dateOfCreation",
            "attests",
            "website",
            "link",
            "numberOfScreenshots",
            "resolved"
        ]).sort({attests: -1});

        if(!isNaN(page)) {
            if((page * 10) < issues.length) {
                if((page * 10) + 10 < issues.length) {
                    returnedIssues = issues.slice(page * 10, (page * 10) + 10)
                }else {
                    returnedIssues = issues.slice(page * 10,)
                }
                // console.lokg(page)
            }else {
                return res.json({noIssues: true});
            }
        }else {
            returnedIssues = issues.slice(0,)
        }
        
        if(issues && issues !== [] && issues.length > 0) {
            return res.json(returnedIssues)
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
            'dateOfCreation',
            'website',
            'attests',
            'resolved',
            "link",
            "numberOfScreenshots",
            'openedBy'
        ]).sort({attests: -1, createdAt: -1});
        if(issues && issues !== [] && issues.length > 0) {
            return res.json(issues)
        }else {
            return res.json({noIssues: true})
        }
    }catch(err) {
        next(err)
    }
}