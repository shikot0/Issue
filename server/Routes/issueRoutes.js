const { createIssue, setIssuePicture, getAllIssues} = require('../Controllers/issueController');

const router = require('express').Router();

router.post('/createissue', createIssue);
router.post('/setissuepicture/:id', setIssuePicture);
router.get('/getallissues/:id', getAllIssues);

module.exports = router; 