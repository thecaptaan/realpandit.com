const auth = require('express').Router()

auth.get('/people/signup', (req, res, next) => {
    res.render('auth/people/signup',{
        title: "Sign Up || RealPandit"
    })
})

auth.get('/people/login', (req, res, next) => {
    res.render('auth/people/login',{
        title: "Log In || RealPandit"
    })
})


auth.get('/pandit/signup', (req, res, next) => {
    res.render('auth/pandit/signup',{
        title: "Sign Up || RealPandit"
    })
})

auth.get('/pandit/login', (req, res, next) => {
    res.render('auth/pandit/login',{
        title: "Log In || RealPandit"
    })
})

auth.get('/verify/account', (req, res, next) => {
    if(req.cookies.token){
        res.redirect('/')
    }
})
module.exports = auth