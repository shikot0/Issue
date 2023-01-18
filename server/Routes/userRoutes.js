const { register, login, setProfilePicture, user, currentUser, profilePicture, allUsers } = require('../Controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

router.post('/profilepicture/:id', setProfilePicture);
router.get('/profilepicture/:id', profilePicture);

router.get('/user/:username', user);  
router.get('/currentuser/:token', currentUser);
// router.get('/allusers/:id', getAllUsers);

module.exports = router;
