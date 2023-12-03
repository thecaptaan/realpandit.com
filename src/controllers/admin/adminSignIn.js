"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminSignIn = require("express").Router();
const admin = require("../../models/adminModel");
adminSignIn.post("/signin", (req, res, next) => {
  admin.findOne({ email: req.body.email }).then((admin) => {
    if (admin) {
      bcrypt.compare(req.body.password, admin.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            { email: admin.email, adminType: admin.type },
            process.env.JWT_SECRET_TOKEN,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token);
          res.json({
            status: "success",
            message: "Login Successful!",
          });
        } else {
          res.json({
            status: "error",
            message: "Password does not match!",
          });
        }
      });
    } else {
      res.json({
        status: "error",
        message: "No user found!",
      });
    }
  });
});

module.exports = adminSignIn;
