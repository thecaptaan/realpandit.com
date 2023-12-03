const thanks = require("express").Router();

thanks.get("/thanks", (req, res, next) => {
  if (req.cookies.people) {
    res.render("thanks", {
      title: "Thanks || RealPandit",
    });
  }else{
    res.status(401).json({
        message: "Auth failed",
    });
  }
});

module.exports = thanks;