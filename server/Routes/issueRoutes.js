const { createIssue, setIssueScreenshot, deleteIssue, resolveIssue, getIssuesFromWebsite, attestIssue, editIssue, getAllIssuesFromUser, getAllIssues, getIssue, getIssueScreenshot, getLatestIssues } = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.get('/latestissues', getLatestIssues);
router.get('/alluserissues/:username', getAllIssuesFromUser);
router.get('/allissues/:page', getAllIssues);
router.get('/issuesfromwebsite/:name', getIssuesFromWebsite);

router.post('/issuescreenshot/:id', setIssueScreenshot);
router.get('/issuescreenshot/:id', getIssueScreenshot);

router.get('/issue/:id', getIssue);
router.delete('/issue/:id', deleteIssue);
router.put('/issue/:id', resolveIssue);
router.put('/issue/:id/:action', attestIssue);
router.put('/issue', editIssue);

module.exports = router; 