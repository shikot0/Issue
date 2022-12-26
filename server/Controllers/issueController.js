const Users = require('../Models/userModel');
const Issues = require('../Models/issueModel');

module.exports.createIssue = async (req, res, next) => {
    try {
        const {openedBy, name, link, description} = req.body;
        console.log(req.body)
        const issue = await Issues.create({
            openedBy,
            name,
            description, 
            link
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
            issues = await Issues.find({openedBy: user._id}).select([
                "openedBy",
                "name",
                "description",
                "resolved"
            ])
        }else if(username === 'all') {
            issues = await Issues.find().select([
                "upenedBy",
                "name",
                "description",
                "resolved"
            ])
        }
        // console.log(issues)
        return res.json(issues)
    } catch(err) {
        next(err)
    }
}