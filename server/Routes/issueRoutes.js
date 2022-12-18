const { createIssue, setIssueScreenshot, getAllIssues} = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.post('/setissuescreenshot/:id', setIssueScreenshot);
router.get('/getallissues/:id', getAllIssues);

module.exports = router; 