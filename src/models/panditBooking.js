"use strict"
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    panditId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("booking",schema)