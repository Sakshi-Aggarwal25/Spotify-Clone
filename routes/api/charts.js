const express = require("express");

var session = require("express-session");
var passport = require("passport");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const charts = "./src/app/API/charts.json";


// Get Charts
router.get("/", (req, res) => {
  // const {userID} = req.session;
  console.log("user " + req.user);
  // console.log("Auth " +req.isAuthenticated())
  console.log("Reading Charts");
  fs.readFile(charts, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    res.send(JSON.parse(data));
  });
});

module.exports = router;
