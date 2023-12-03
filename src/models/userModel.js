"use strict";
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
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
    profileImg: {
        type: String,
        default: "profile.png"
    },
    accountActive:{
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model("users", schema)