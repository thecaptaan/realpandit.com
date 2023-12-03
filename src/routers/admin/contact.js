"use strict";

const contactRoute = require("express").Router();
const contact = require("../../models/contactModel");
contactRoute.get("/contact", (req, res, next) => {
  contact
    .find({})
    .then((data) => {
      if (!data) {
        res.render("admin/dashboard", {
          title: "Contact Us || RealPandit",
          urlRoute: "contact",
          contact: "",
        });
      } else {
        res.render("admin/dashboard", {
          title: "Contact Us || RealPandit",
          urlRoute: "contact",
          contact: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
        contact: "",
      });
    });
});

module.exports = contactRoute;
