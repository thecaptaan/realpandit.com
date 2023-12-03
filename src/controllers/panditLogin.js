const pandit = require("../models/panditModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const panditLogin = require("express").Router();
const axios = require("axios").default;
panditLogin.post("/pandit/login", async (req, res) => {

    let secret_key = process.env.RECAPTCHA_SECRET_KEY
    let token = req.body.gReCaptcha
    let reCaptchaValidate = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`)
    // recaptcha validation
    if (reCaptchaValidate.data.success) {
        const data = await pandit.findOne({
            phoneNo: req.body.phoneNo,
        });
        if (!data) {
            return res.status(400).json({
                error: true,
                message: "Invalid credentials",
            });
        } else {
            const validPassword = await bcrypt.compare(
                req.body.password,
                data.password
            );
            if (!validPassword) {
                return res.status(400).json({
                    error: true,
                    message: "Invalid credentials",
                });
            } else {
                jwt.sign(
                    { panditId: pandit._id },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: "1h" },
                    (err, token) => {
                        if (err) {
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
                                message: "Pandit logged in successfully",
                            });
                        }
                    }
                );
            }
        }
    }
    else {
        res.status(400).json({
            error: true,
            message: "Please verify captcha"
        })
    }
});
module.exports = panditLogin;
