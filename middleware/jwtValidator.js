const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    console.log(`token received by auth module ${JSON.stringify(req.headers)}`);
    
    if(!token) {
        return res.status(401).json({error: "Token Missing"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({error: "Token invalid or expired!"})
        }
        req.userId = user.userId;
        next();
    });
}

module.exports = authenticate
