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
        const id = req.params.id; 
        let issues;
        if(id) {
            issues = await Issues.find({openedBy: id}).select([
                "openedBy",
                "name",
                "description",
                // "screenshot",
                "resolved"
            ])
        }else {
            issues = await Issues.find().select([
                "upenedBy",
                "name",
                "description",
                // "screenshot",
                "resolved"
            ])
        }
        console.log(issues)
        return res.json(issues)
    } catch(err) {
        next(err)
    }
}