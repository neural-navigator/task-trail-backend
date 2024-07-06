const User = require('./models/User');

const createUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser
};