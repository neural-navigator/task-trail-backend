const User = require('../models/User');

const createUser = async(req, res) => {

    const {name, email, password} = req.body;

    try {
        let existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "user already exists"});
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({message: "user created!"});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser
};