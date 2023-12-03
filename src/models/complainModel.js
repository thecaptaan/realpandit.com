"use strict";
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  complainerID: {
    type: ObjectId,
    required: true,
  },
  againstID: {
    type: ObjectId,
    required: true,
  },
  complainType: {
    type: String,
    required: true,
  },
  complainDescription: {
    type: String,
    required: true,
  },
  complainMedia:{
    type: String,
    required: true,
  },
  complainDate: {
    type: Date,
    required: true,
  },
  complainStatus: {
    type: String,
    required: true,
  },
  complainAction: {
    type: String,
    required: true,
  },
  complainActionDate: {
    type: Date,
    required: true,
  },
  complainActionBy: {
    type: String,
    required: true,
  },
  complainActionDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("complains", Schema);