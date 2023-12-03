const jwt = require("jsonwebtoken");
module.exports = function authenticate(req, res, next) {
  let verification;
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.clearCookie();
        res.redirect("/");
      } else {
        verification = decoded
        return decoded;
      }
    });
  } else {
    res.redirect("/");
  }
  return verification
};
