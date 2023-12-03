"use strict";
const admins = require("../../models/adminModel");
const { validateData } = require("../../utils/adminValidate");
const addAdmin = require("express").Router();
// kUXgr2p/management/addAdmin
addAdmin.post("/addAdmin", async (req, res) => {
    
    let result = validateData(req.body);
    if (result.error) {
        return res.status(400).json({
            error: true,
            message: result.message,
            key: result.key,
        });
    }
    else{
        // try {
        //     let admin = new admins({
        //         firstName: req.body.firstName,
        //         lastName: req.body.lastName,
        //         email: req.body.email,
        //         phoneNo: req.body.phoneNo,
        //         password: req.body.password,
        //         type: "admin",
        //     });
        //     let saveAdmin = await admin.save();
        //     if (saveAdmin) {
        //         return res.status(200).json({
        //             error: false,
        //             message: "Admin added successfully",
        //         });
        //     }
        //     else{
        //         return res.status(400).json({
        //             error: true,
        //             message: "Something went wrong",
        //         });
        //     }
        // } catch (error) {
        //     return res.status(400).json({
        //         error: true,
        //         message: "Something went wrong",
        //     });
        // }
    }

});

module.exports = addAdmin;
