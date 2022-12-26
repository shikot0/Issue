const Users = require('../Models/userModel');
const Issues = require('../Models/issueModel');

module.exports.createIssue = async (req, res, next) => {
    try {
        const {openedBy, name, link, description} = req.body;
        const issue = await Issues.create({
            openedBy, 
            name,
            description, 
            link,
            dateOfCreation: new Date().toDateString()
        });
        return res.json({status: true, id: issue._id});
    } catch(err) {
        next(err);
    }
}

module.exports.setIssueScreenshot = async (req, res,next) => {
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
                "resolved"
            ])
        }else if(username === 'all') {
            issues = await Issues.find().select([
                "openedBy",
                "name",
                "description",
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
            'resolved',
            'openedBy'
        ]);
        res.json(issues)
    }catch(err) {
        next(err)
    }
}