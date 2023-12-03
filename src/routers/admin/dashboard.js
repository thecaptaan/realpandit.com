"use strict";
const moment = require("moment");
const dashboard = require("express").Router();
const authenticate = require("../../utils/adminAuthenticate");
const users = require("../../models/userModel");
const pandits = require("../../models/panditModel");
const findLastSixMonthData = require("../../utils/sixMonthSorter");

dashboard.get("/", async (req, res, next) => {
  let tokenProfile = authenticate(req, res, next);
  try {
    const totalUsers = await users.find().exec();
    const totalPandits = await pandits.find().exec();
    res.render("admin/dashboard", {
      title: "Dashboard",
      urlRoute: "kUXgr2p",
      tokenProfile,
      usersData: totalUsers,
      panditsData: totalPandits,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});
dashboard.get("/signin", (req, res) => {
  res.render("admin/signin", {
    title: "Dashboard",
  });
});
module.exports = dashboard;
