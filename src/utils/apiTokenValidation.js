const jwt = require("jsonwebtoken");
module.exports =  function apiTokenValidation(req, res, next) {
  const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            res.clearCookie();
            res.json({
                status: false,
                message: "Invalid token",
            })
        } else {
            next();
        }
        });
    } else {
        res.json({
            status: false,
            message: "No token provided",
        })
    }
}