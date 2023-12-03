"use strict";
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    accountActive:{
        type: Boolean,
        default: false
    },
    profileImg: {
        type: String,
        default: "profile.png"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model("pandits", schema)