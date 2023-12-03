"use strict";
const bcrypt = require("bcrypt");
const login = require("express").Router();
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;
login.post("/people/login", async (req, res, next) => {
  let secret_key = process.env.RECAPTCHA_SECRET_KEY
  let token = req.body.gReCaptcha
  let reCaptchaValidate = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`)
  // recaptcha validation
  if (reCaptchaValidate.data.success) {
  console.log(req.body);
  user
    .findOne({ phoneNo: req.body.phoneNo })
    .then((response) => {
      console.log(response);
      if (response === null) {
        res.status(400).json({
          message: "User not found",
        });
      } else {
        bcrypt.compare(req.body.password, response.password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Invalid credentials",
            });
          } else {
            jwt.sign(
              {
                userId: response._id,
                isVerified: response.isVerified,
              },
              process.env.JWT_SECRET_TOKEN,
              (err, token) => {
                if (err) {
                  res.status(500).json({
                    message: "Error occurred while logging in",
                  });
                }
                res.cookie("people", token, { httpOnly: true });
                res.status(200).json({
                  message: "Auth successful",
                });
              }
            );
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error occurred while logging in",
      });
    });
  }
  else {
    res.status(400).json({
      error: true,
      message: "Please verify captcha"
    })
  }
});

module.exports = login;
