"use strict"
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const path = require('node:path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const server = express();

server.use(cors())
server.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "https://elasticbeanstalk-ap-south-1-679122753279.s3.ap-south-1.amazonaws.com/"],
      },
    },
  }))
server.use(cookieParser())
server.use(express.json())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.use(expressLayouts)
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'src/views'))

const PORT = process.env.PORT || 8080

server.use(express.static(path.join(__dirname, 'src/assets/fonts')))
server.use(express.static(path.join(__dirname, 'src/assets/videos')))
server.use(express.static(path.join(__dirname, 'src/assets/scripts')))
server.use(express.static(path.join(__dirname, 'src/assets/styles')))
server.use(express.static(path.join(__dirname, 'src/assets/images')))

const unAuth = require('./src/routers/unAuth')

server.use(unAuth)
server.use((req, res, next) => {
    res.status(404).render('error/404')
})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})