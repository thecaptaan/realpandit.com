"use strict";
const contact = require("../models/contactModel");
const contactController = require("express").Router();
const validateData = require("../utils/contactValidate");
contactController.post("/contact", (req, res, next) => {
    let result = validateData(req.body);
    if (result.error) {
        res.status(400).json({
            error: true,
            key: result.key,
            message: result.message,
        });
    }
    else {
        let newContact = new contact({
            fullName: req.body.fullName,
            email: req.body.email,
            position: req.body.position,
            message: req.body.message,
        });
        newContact
            .save()
            .then((data) => {
            res.status(200).json({
                error: false,
                message: "Message sent successfully",
            });
        })
            .catch((err) => {
            res.status(500).json({
                error: true,
                message: "Something went wrong",
            });
        });
    }
});

module.exports = contactController;