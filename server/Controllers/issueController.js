const Issues = require('../Models/issueModel');

module.exports.createIssue = async (req, res, next) => {
    try {
        const {openedBy, name, description} = req.body;
        const issue = await Issues.create({
            openedBy,
            name,
            description
        });
        return res.json({status: true, id: issue._id});
    } catch(err) {
        next(err);
    }
}

module.exports.setIssuePicture = async (req, res,next) => {
    try {
        const id = req.params.id;
        const {data, mimetype} = req.files.fileupload;
        const issue = await Issues.findOne({_id: id})
        issue.profilePicture.Data = data;
        issue.profilePicture.ContentType = mimetype; 

        await issue.save();
        return res.json({msg:'Your issue was successfully created!',status: true});
    } catch(err) {
        next(err)
    }
}

module.exports.getAllIssues = async (req, res, next) => {
    try {
        const user = req.params.user;
        if(user) {
            const issues = Issues.findOne({openedBy: user.id}).select([
                "name",
                "description",
                "screenshot",
                "resolved"
            ])
        }else {
            const issues = Issues.find().select([
                "name",
                "description",
                "screenshot",
                "resolved"
            ])
        }
    } catch(err) {
        next(err)
    }
}