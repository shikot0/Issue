const { createIssue, setIssueScreenshot, getIssuesFromWebsite, editIssue, getAllIssues, getIssue, getIssueScreenshot, getLatestIssues } = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.post('/setissuescreenshot/:id', setIssueScreenshot);
router.get('/latestissues', getLatestIssues);
router.get('/allissues/:username', getAllIssues);
router.get('/issue/:id', getIssue);
router.get('/issuesfromwebsite/:name', getIssuesFromWebsite);
router.get('/issuescreenshot/:id', getIssueScreenshot);
router.put('/editissue', editIssue);
// router.patch('/editissue', editIssue);

module.exports = router; 