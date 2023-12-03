"use strict";
const admin = require("../../models/adminModel");
const managementRouter = require("express").Router();
const authenticate = require("../../utils/adminAuthenticate");

managementRouter.get("/management", (req, res, next) => {
  let tokenProfile = authenticate(req, res, next);
  admin.find({}).then(adminData =>{
    res.render("admin/dashboard", {
      title: "Dashboard",
      urlRoute: "management",
      tokenProfile,
      admins: adminData
    });
  })
  
});

module.exports = managementRouter;
