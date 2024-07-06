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
        newUser.password = bcrypt.hash(newUser.password, 10);
        await newUser.save();
        res.status(201).json({message: "user created!"});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};


const checkUserStatus = async(req, res) => {
    const {email, password} = req.body();
    try{
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({error: "user not found"})
        }
        const hashedPassword = bcrypt.hash(password, 10);
        const existingPassword = existingUser.password;
        const isMatch = bcrypt.compare(existingPassword, hashedPassword);
        if (!isMatch) {
            return res.status(400).json({error: "incorrect password!"})
        }
        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: "login Succeed!", token: token})
    } catch(error) {
        res.status(500).json({error: `server error:: ${error}`})
    }
}

module.exports = {
    createUser, checkUserStatus
};