"use strict";
const pandit = require('../data/featuredPandit')
const unAuth = require('express').Router()

unAuth.get('/', (req, res, next) => {
   res.render('index', {
      panditData: pandit,
      title: "Get Pandit For Hindu Rituals ||Real Pandit"
   })
})

unAuth.get('/about', (req, res, next) => {
   res.render('about',{
      title: "About Us ||Real Pandit"
   })
})

unAuth.get('/contact', (req, res, next) => {
   res.render('contact',{
      title: "Contact Us ||Real Pandit"
   })
})


module.exports = unAuth