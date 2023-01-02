const { createIssue, setIssueScreenshot, getAllIssues, getLatestIssues } = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.post('/setissuescreenshot/:id', setIssueScreenshot);
router.get('/latestissues', getLatestIssues);
router.get('/allissues/:username', getAllIssues);

module.exports = router; 