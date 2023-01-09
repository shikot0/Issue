const bcrypt = require('bcrypt');
const Users = require('../Models/userModel');
const generateToken = require('../utils/generateToken'); 
// require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await Users.findOne({username: username.toLowerCase()});
        const emailCheck = await Users.findOne({email})
        if(usernameCheck) {
            return res.json({msg: 'Username is already in use', status: false});
        }
        if(emailCheck) {
            return res.json({msg: 'Email is already in use', status: false});
        }
        
        
        const token = jwt.sign({password}, 'sarangeulhaetda');
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            email,
            username,
            token,
            password: hashedPassword
        });
        console.log(user) 
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
        // console.log(username)
        const user = await Users.findOne({username: username}).select([
            "_id",
            "email",
            "username", 
        ]);
        return await res.json(user);
    } catch(err) {
        next(err);
    }
}

// module.exports.currentUser = async (req, res, next) => {    
//     console.log('test')
// }

module.exports.currentUser = async (req, res, next) => {
    try {
        const userToken = req.params.token;
        const user = await Users.findOne({token: userToken}).select([
                "_id",
                "email",
                "username", 
            ]);
        // console.log(user)
        res.json(user)          
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