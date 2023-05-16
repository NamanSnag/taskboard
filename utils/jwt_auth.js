const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({
        succcess: false,
        message: "You are not authenticated",
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) return res.status(401).json({
            succcess: false,
            message: "Token is invalid"
        });
        req.user = data;
        next();
    });
}

module.exports = {
  verifyToken
};