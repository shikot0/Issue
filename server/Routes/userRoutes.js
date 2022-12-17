const { register, login, setProfilePicture, getUser, getProfilePicture, getAllUsers } = require('../Controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setprofilepicture/:id', setProfilePicture);
router.get('/getprofilepicture/:id', getProfilePicture);
router.get('/getuser/:id', getUser);
// router.get('/allusers/:id', getAllUsers);

module.exports = router;
