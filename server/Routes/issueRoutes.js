const { createIssue, setIssueScreenshots, deleteIssue, resolveIssue, getIssuesFromWebsite, attestIssue, editIssue, getAllIssuesFromUser, getAllIssues, getIssue, getIssueScreenshots, getLatestIssues } = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.get('/latestissues', getLatestIssues);
router.get('/alluserissues/:username', getAllIssuesFromUser);
router.get('/allissues/:page', getAllIssues);
router.get('/issuesfromwebsite/:name', getIssuesFromWebsite);

router.get('/issue/:id', getIssue);
router.delete('/issue/:id', deleteIssue);
router.patch('/issue/:id', resolveIssue);
router.patch('/issue/:id/:action', attestIssue);
router.patch('/issue', editIssue);

router.post('/issue/:id/screenshot', setIssueScreenshots);
router.get('/issue/:id/screenshot', getIssueScreenshots);
router.get('/issue/:id/screenshot/:number', getIssueScreenshots);

module.exports = router; 