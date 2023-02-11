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
router.patch('/issue/:id', resolveIssue);
router.patch('/issue/:id/:action', attestIssue);
router.patch('/issue', editIssue);

module.exports = router; 