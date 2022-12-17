const bcrypt = require('bcrypt');
const Users = require('../Models/userModel');

module.exports.register = async (req,res,next) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await Users.findOne({username});
        const emailCheck = await Users.findOne({email})
        if(usernameCheck) {
            return res.json({msg: 'Username is already in use', status: false});
        }
        if(emailCheck) {
            return res.json({msg: 'Email is already in use', status: false});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username,
            password: hashedPassword
        });

        const returnedUser = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        // console.log(returnedUser)
        return res.json({status: true, returnedUser})
    } catch(err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await Users.findOne({username});

        if(!user) { 
            return res.json({msg: 'Incorrect username or password', status: false});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.json({msg: 'Incorrect username or password', status: false});
        }
        const returnedUser = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        return res.json({status: true, returnedUser})
    } catch(err) {
        next(err)
    }
}  

module.exports.setProfilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {data, mimetype} = req.files.fileupload;
        const user = await Users.findOne({_id: id})
        user.profilePicture.Data = data;
        user.profilePicture.ContentType = mimetype; 

        await user.save();
        return res.json({status: true})
    } catch(err) {
        next(err)
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({_id: id}).select([
            "email",
            "username", 
            "_id",
        ]);
        return res.json(user);
    } catch(err) {
        next(err);
    }
}

module.exports.getProfilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({_id: id}); 
        res.type('Content-Type', user.profilePicture.ContentType)
        return res.status(200).send(user.profilePicture.Data)
    } catch(err) {
        next(err)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username", 
            "_id",
            "profilePicture"
        ])
        if(users) {
            return res.json(users);
        }else {
            return res.json('There are no others online')
        }
    }
    catch(err) {
        next(err)
    }
}