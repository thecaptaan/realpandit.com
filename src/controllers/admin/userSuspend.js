"use strict";

const users = require("../../models/userModel");
const userSuspend = require("express").Router();

// http://localhost:8000/kUXgr2p/users/6547ebe2b433180b03678a0d/suspend
userSuspend.post("/users/:id/suspend", async (req, res) => {
    try {
        const user = await users.findByIdAndUpdate(
        req.params.id,
        { $set: { accountActive: false } },
        { new: true }
        );
        res.status(200).json({ 
            success: true,
            message: "User suspended"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message 
        });
    }
});

userSuspend.post("/users/:id/unsuspend", async (req, res) => {
    try {
        const user = await users.findByIdAndUpdate(
        req.params.id,
        { $set: { accountActive: true } },
        { new: true }
        );
        res.status(200).json({ 
            success: true,
            message: "User activated"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message 
        });
    }
}); 

module.exports = userSuspend;
