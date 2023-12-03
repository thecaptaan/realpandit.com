"use strict";
const user = require("../../models/userModel");
const dashboard = require("express").Router();
dashboard.get("/users", (req, res) => {
    user.find({}).then((response) => {
        res.render("admin/dashboard", {
            title: "Dashboard",
            urlRoute: "users",
            users: response,
        });
    });
});

module.exports = dashboard;
