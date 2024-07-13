const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "user already exists"});
        }
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(newUser.password, 12);
        await newUser.save();
        res.status(201).json({message: "user created!"});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};


const verifyUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({error: "user not found"})
        }
        const existingPassword = existingUser.password;
        const isMatch = await bcrypt.compare(password, existingPassword);
        if (isMatch) {
            const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return res.status(200).json({message: "login Succeed!", token: token, username: existingUser.name})
            
        } else {
            return res.status(400).json({error: "incorrect password!"})
        }
        
    } catch(error) {
        res.status(500).json({error: `server error:: ${error}`})
    }
}

const getUserData = async(req, res) => {
    const userId = req.userId;
    try {
        const userProfile = await User.findOne({_id: userId});
        if(!userProfile) {
            res.status(404).json({message: "User not found!"})
        } else {
            res.status(200).json({userProfile})
        } 
    } catch(error) {
        res.status(502).json({"message": `server Error:: ${error}`, userProfile: {}})
    }
}

const changeUserProfile = async(req, res) => {
    const userId = req.userId;
    try {
        const existingProfile = await User.findOne({_id: userId});
        if(!existingProfile) {
            res.status(404).json({message: "user not found"})
        } else {
            const result = await User.updateOne({_id: userId}, {...req.body})
            console.log(result);
            res.status(201).json({message: "changes done in db"})
        }
    } catch(error) {
        res.status(502).json({message: `error ::: ${error}`})
    }
}

module.exports = {
    createUser, verifyUser, getUserData, changeUserProfile
};
