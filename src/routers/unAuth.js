"use strict";
const path = require('path')
const whyChoose = require('../data/chooseus.js')
const unAuth = require('express').Router()

unAuth.get('/', (req, res, next) => {
   res.render('index', {
      choose: whyChoose,
      title: "Hire Experienced Pandits for Puja and Other Ceremonies || RealPandit"
   })
})

unAuth.get('/about', (req, res, next) => {
   res.render('about',{
      title: "About Us || RealPandit"
   })
})

unAuth.get('/contact', (req, res, next) => {
   res.render('contact',{
      title: "Contact Us || RealPandit"
   })
})
unAuth.get('/team', (req, res, next) => {
   res.render('team',{
      title: "About Team || RealPandit"
   })
})
unAuth.get('/privacy-policy', (req, res, next) => {
   res.sendFile(path.join(__dirname, '../views/privacy-policy.html'))
})

module.exports = unAuth