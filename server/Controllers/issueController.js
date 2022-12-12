const Issues = require('../Models/IssueModel');


module.exports.getAllIssues = (req, res, next) => {
    try {
        const user = req.params.user;
        if(user) {
            const issues = Issues.find().select([
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