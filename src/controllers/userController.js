"use strict";
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const axios = require('axios').default;
const user = require('../models/userModel')
const validateData = require('../utils/validate')
const userController = require('express').Router();

userController.post('/people/create', async (req, res, next) => {

    let secret_key = process.env.RECAPTCHA_SECRET_KEY
    let token = req.body.gReCaptcha
    let reCaptchaValidate = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`)

    // recaptcha validation
    if (reCaptchaValidate.data.success) {
        let validate = validateData(req.body)

        // validate data
        if (validate.error) {
            res.status(400).json({
                status: false,
                message: validate.message
            })
        } else {
            let existingUser = await user.find({ phoneNo: validate.value.phoneNo })

            // check if user already exist
            if (existingUser.length > 0) {
                res.status(409).json({
                    status: true, message: "User already exist. Try to login",
                    value: validate.value.phoneNo
                })
            } 
            else {

                let hash = bcrypt.hashSync(validate.value.password, 10)
                user.create({
                    firstName: validate.value.firstName,
                    lastName: validate.value.lastName,
                    phoneNo: validate.value.phoneNo,
                    password: hash,
                    createdAt: moment().format('YYYY-MM-DD h:mm:ss a'),
                    updatedAt: moment().format('YYYY-MM-DD h:mm:ss a')
                }).then(
                    response => {
                        jwt.sign({ id: response._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                res.status(500).json({
                                    status: false,
                                    message: "Error occured while signing token"
                                })
                            } else {
                                res.cookie('people', token, { maxAge: 900000, httpOnly: true });
                                res.status(200).json({
                                    status: true,
                                    message: "Account created successfully",
                                })
                            }
                        })
                    }
                ).catch(
                    error => {
                        res.status(500).json({
                            status: false,
                            message: "Error occured while creating account"
                        })
                    }
                )
            }
        }
    } else {
        res.status(400).json({
            status: false,
            message: "Invalid Captcha"
        })
    }

})

module.exports = userController