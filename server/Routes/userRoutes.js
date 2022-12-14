const { register, login, setProfilePicture, getAllUsers } = require('../Controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('setprofilepicture:id', setProfilePicture);
router.get('/allusers/:id', getAllUsers);

module.exports = router;
