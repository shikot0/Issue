const {registerWebsite, setWebsiteImage, websiteImage, getAllWebsites} = require('../Controllers/websiteController');

const router = require('express').Router();
router.post('/register', registerWebsite)
router.post('/setwebsiteimage/:id', setWebsiteImage);
router.get('/websiteimage/:id', websiteImage);
router.get('/allwebsites', getAllWebsites);
module.exports = router;