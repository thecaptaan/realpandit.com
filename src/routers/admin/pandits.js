const panditRouter = require("express").Router();
const pandit = require("../../models/panditModel");

panditRouter.get("/pandits", (req, res) => {
    pandit.find({}).then((response) => {
        res.render("admin/dashboard", {
        title: "Dashboard",
        urlRoute: "pandits",
        pandits: response,
        });
    });
});

module.exports = panditRouter;
