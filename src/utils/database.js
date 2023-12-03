"use strict";
const mongoose = require("mongoose");
mongoose.connect(process.env.GET_DATABASE_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});
mongoose.connection.on("error", () => {
  console.log("Mongoose connection error");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("SIGINT", () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
