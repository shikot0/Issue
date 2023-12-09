const Users = require('../Models/userModel');
const Issues = require('../Models/issueModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body; 
        const usernameCheck = await Users.findOne({username: username.toLowerCase()});
        const emailCheck = await Users.findOne({email});
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

        const token = jwt.sign(email, process.env.JWT_SECRET);
        if(user) {
            return res.json({succeeded: true, id: user._id, token})
        }else {
            return res.json({succeeded: false, msg: 'Could not create user, please try again later'})
        }
    } catch(err) {
        next(err);
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await Users.findOne({username});
        if(!user) {
            return res.json({succeeded: false, msg: 'User does not exist'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!user) { 
            return res.json({succeeded: false, msg: 'Incorrect username or password'});
        }else if(!isPasswordValid) {
            return res.json({succeeded: false, msg: 'Incorrect username or password'});
        }
        
        const token = jwt.sign(user.email, process.env.JWT_SECRET);
        return res.json({succeeded: true, token})
    } catch(err) {
        next(err)
    }
}  

module.exports.profilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({_id: id}); 
        res.setHeader('Content-Type', user.profilePicture.ContentType);
        return res.status(200).send(user.profilePicture.Data)
    } catch(err) {
        next(err)
    }
}

module.exports.setProfilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const accessToken = req.headers["x-access-token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await Users.findOne({_id: id});
        const {data, mimetype} = req.files.fileupload;

        if(decoded === user.email) {
            sharp(data).resize(200, 200).toBuffer().then(result => {
                if(result && mimetype) {
                    user.profilePicture.Data = result;
                    user.profilePicture.ContentType = mimetype; 
                    user.save().then(() => {
                        return res.json({succeeded: true, msg: 'Profile picture saved successfully!'});
                    })
                }else {
                    return res.json({succeeded: false, msg: 'There has been an error'});
                }
            });
        }else {
            return res.json({suceeded: false, msg: 'There has been an error'});
        }

        // if(decoded === user.email && resizedImage && mimetype) {
        //     user.profilePicture.Data = resizedImage;
        //     user.profilePicture.ContentType = mimetype; 
    
        //     await user.save();
        //     return res.json({status: 200, msg: 'Profile picture saved successfully!'});
        // }else {
        //     return res.json({status: 400, msg: 'There has been an error'});
        // }
    } catch(err) {
        next(err)
    }
}

module.exports.getUser = async (req, res, next) => {
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

module.exports.editUsername = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {username} = req.body;
        const accessToken = req.headers["x-access-token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await Users.findOne({_id: id});
        const existingUser = await Users.findOne({username: username}) ? await Users.findOne({username: username}) : await Users.findOne({username: username.toLowerCase()}) ? await Users.findOne({username: username.toLowerCase()}) : await Users.findOne({username: username.toUpperCase()}) ? await Users.findOne({username: username.toUpperCase()}) : null;
        
        if(user && username && !existingUser && decoded === user.email) {
            await Issues.updateMany({"openedBy.username": user.username}, { $set: {"openedBy.username": username.trim() }});
            user.username = username.trim();
            await user.save();
            return res.json({succeeded: true, msg: 'Successfully changed username!', username: username})
        }else if(existingUser) {
            return res.json({succeeded: false, msg: 'Sorry that username has already been taken'});
        }else {
            return res.json({succeeded: false, msg: 'User not found'});
        }
    } catch(err) {
        next(err);
    }
}

module.exports.currentUser = async (req, res, next) => {
    try {
        // const userToken = req.params.token;  
        const userToken = req.headers['x-access-token'];
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await Users.findOne({email: decoded}).select([
                "_id",
                "email",
                "username", 
                "notifications",
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

module.exports.markNotificationsAsRead = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findOne({email: decoded});

        if(user) {
            user.notifications = user.notifications.map(notification => {
                return {...notification, seen: true};
            })
            await user.save();
            return res.json({succeeded: true, msg: 'All the messages have been marked as read!'});
        }else {
            return res.json({succeeded: false, msg: 'Could not mark messages as read'});
        }
    } catch(err) {
        next(err);
    }
}