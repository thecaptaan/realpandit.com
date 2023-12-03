"use strict";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const profile = require('express').Router()
const user = require('../models/userModel')

profile.post('/user/profile', (req,res,next)=>{

})
module.exports = profile
