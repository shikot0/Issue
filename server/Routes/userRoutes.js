const { register, login, setProfilePicture, getUser, editUsername, currentUser, profilePicture, allUsers, markNotificationsAsRead } = require('../Controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

router.post('/profilepicture/:id', setProfilePicture);
router.get('/profilepicture/:id', profilePicture);

router.get('/user/:username', getUser);  
router.patch('/user/:id', editUsername);  
router.patch('/notifications', markNotificationsAsRead)
router.get('/currentuser/:token', currentUser);
router.get('/allusers', allUsers);

module.exports = router;
