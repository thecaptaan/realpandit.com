const panditController = require("express").Router();
const panditModel = require("../models/panditModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateData = require("../utils/panditValidate");
const axios = require("axios").default;
panditController.post("/pandit/signup", async (req, res) => {
  let secret_key = process.env.RECAPTCHA_SECRET_KEY;
  let token = req.body.gReCaptcha;
  let reCaptchaValidate = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`
  );
  // recaptcha validation
  if (reCaptchaValidate.data.success) {
    const result = validateData(req.body);
    if (result.error) {
      return res.status(400).json({
        error: true,
        message: result.message,
      });
    } else {
      try {
        const isPhone = await panditModel.findOne({
          phoneNo: result.data.phoneNo,
        });
        if (isPhone) {
          return res.status(400).json({
            error: true,
            message: "Mobile number already registered",
          });
        } else {
          const pandit = new panditModel({
            fullName: req.body.fullName,
            phoneNo: req.body.phoneNo,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
          });
          const salt = await bcrypt.genSalt(10);
          pandit.password = await bcrypt.hash(pandit.password, salt);
          await pandit.save();
          jwt.sign(
            { panditId: pandit._id },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  error: true,
                  message: "An error occurred. Please try again later.",
                });
              } else {
                res.cookie("pandit", token, {
                  httpOnly: true,
                });
                res.status(200).json({
                  error: false,
                  message: "Pandit registered successfully",
                });
              }
            }
          );
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          message: "An error occurred. Please try again later.",
        });
      }
    }
  } else {
    res.status(400).json({
      error: true,
      message: "Please verify captcha",
    });
  }
});

module.exports = panditController;
