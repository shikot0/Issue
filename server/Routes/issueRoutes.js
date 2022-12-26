const { createIssue, setIssueScreenshot, getAllIssues, getLatestIssues } = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.post('/setissuescreenshot/:id', setIssueScreenshot);
router.get('/getlatestissues', getLatestIssues);
router.get('/getallissues/:username', getAllIssues);

module.exports = router; 