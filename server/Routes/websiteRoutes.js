const {registerWebsite, setWebsiteImage, websiteImage, getWebsite, getAllWebsites, editWebsite} = require('../Controllers/websiteController');

const router = require('express').Router();
router.post('/register', registerWebsite);

router.post('/websiteimage/:id', setWebsiteImage);
router.get('/websiteimage/:id', websiteImage);

router.get('/allwebsites', getAllWebsites);
router.get('/website/:name', getWebsite);
router.post('/website/:id', editWebsite);
module.exports = router;