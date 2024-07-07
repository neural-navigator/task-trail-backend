const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({error: "Token Missing"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({error: "Token invalid or expired!"})
        }

        console.log(`user with this token is ${user}`)
        req.user = user;
        next();
    });
}

module.exports = authenticate