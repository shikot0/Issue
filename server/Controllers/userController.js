const Users = require('../Models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken'); 
// require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body; 
        // console.log(username, email, password);
        const usernameCheck = await Users.findOne({username: username.toLowerCase()});
        const emailCheck = await Users.findOne({email});
        if(usernameCheck) {
            return res.json({msg: 'Username is already in use', status: false});
        }
        if(emailCheck) {
            return res.json({msg: 'Email is already in use', status: false});
        }
        
        
        const token = jwt.sign({password}, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            email,
            username,
            token,
            password: hashedPassword
        });
        return res.json({id: user._id, token, status: 200})
    } catch(err) {
        next(err);
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await Users.findOne({username});
        if(!user) { 
            return res.json({msg: 'Incorrect username or password', status: 400});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.json({msg: 'Incorrect username or password', status: 400});
        }
        
        return res.json({token: user.token, status: 200})
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
        return res.json({status: 200});
    } catch(err) {
        next(err)
    }
}

module.exports.user = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await Users.findOne({username: username}).select([
            "_id",
            "email",
            "username", 
        ]);
        if(user) {
            return res.json(user);
        }else {
            return res.json({noUser: true})
        }
    } catch(err) {
        next(err);
    }
}

module.exports.currentUser = async (req, res, next) => {
    try {
        const userToken = req.params.token;
        const user = await Users.findOne({token: userToken}).select([
                "_id",
                "email",
                "username", 
            ]);

        if(user) {
            return res.json(user);
        }else {
            return res.json({noUser: true})
        }
    } catch(err) {
        next(err);
    }
}

module.exports.profilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({_id: id}); 
        res.type('Content-Type', user.profilePicture.ContentType)
        return res.status(200).send(user.profilePicture.Data)
    } catch(err) {
        next(err)
    }
}

module.exports.allUsers = async (req, res, next) => {
    try {
        const users = await Users.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username", 
            "_id",
        ])
        if(users) {
            return res.json(users);
        }else {
            return res.json({noUsers: true})
        }
    }
    catch(err) {
        next(err)
    }
}