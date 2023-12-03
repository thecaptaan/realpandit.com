"use strict";
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./src/utils/database");
const expressLayouts = require("express-ejs-layouts");
const server = express();

server.use(cors());
server.use(
  helmet({
    contentSecurityPolicy: false,
    directives: {
      "script-src": [
        "'self'",
        "amazonaws.com",
        "cdnjs.cloudflare.com",
        "google.com","https://inorganik.github.io"
      ],
      "img-src": [
        "'self'",
        "https://elasticbeanstalk-ap-south-1-679122753279.s3.ap-south-1.amazonaws.com/",
      ],
      "media-src": [
        "'self'",
        "https://elasticbeanstalk-ap-south-1-679122753279.s3.ap-south-1.amazonaws.com/",
      ],
      "font-src": [
        "'self'",
        "https://elasticbeanstalk-ap-south-1-679122753279.s3.ap-south-1.amazonaws.com/",
      ],
      "style-src": [
        "'self'",
        "https://elasticbeanstalk-ap-south-1-679122753279.s3.ap-south-1.amazonaws.com/",
      ],
    },
  })
);
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(expressLayouts);
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src/views"));

server.use(express.static(path.join(__dirname, "src/assets/fonts")));
server.use(express.static(path.join(__dirname, "src/assets/videos")));
server.use(express.static(path.join(__dirname, "src/assets/scripts")));
server.use(express.static(path.join(__dirname, "src/assets/styles")));
server.use(express.static(path.join(__dirname, "src/assets/images")));

const Auth = require("./src/routers/auth");
const unAuth = require("./src/routers/unAuth");
const thanks = require("./src/routers/thanks");

server.use(unAuth);
server.use("/user/", Auth);

const userController = require("./src/controllers/userController");
const contact = require("./src/controllers/contactController");
const peopleLogin = require("./src/controllers/loginController");

const panditController = require("./src/controllers/panditController");
const panditLogin = require("./src/controllers/panditLogin");
server.use(panditController);
server.use(panditLogin);
server.use(contact);
server.use(userController);
server.use(peopleLogin);
server.use(thanks);

// User Api Routes
//Admin
const dashboard = require("./src/routers/admin/dashboard");
const users = require("./src/routers/admin/users");
const adminContact = require("./src/routers/admin/contact");
const pandits = require("./src/routers/admin/pandits");
const management = require("./src/routers/admin/management");
const adminSignIn = require("./src/controllers/admin/adminSignIn");
const userSuspend = require("./src/controllers/admin/userSuspend");

server.use("/kUXgr2p/", dashboard);
server.use("/kUXgr2p/", users);
server.use("/kUXgr2p/", pandits);
server.use("/kUXgr2p/", adminContact);
server.use("/kUXgr2p/", management);
server.use("/kUXgr2p/", adminSignIn);
server.use("/kUXgr2p/", userSuspend);
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// mongodb+srv://realpandit:QmQov3vjiUWvi5qD@realpandit.px90xav.mongodb.net/
