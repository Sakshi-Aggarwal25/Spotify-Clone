const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const songsList = "./src/app/API/songsList.json";

// Get songs list
router.get("/", (Req, res) => {
  console.log("Reading Songs list");
  fs.readFile(songsList, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    res.send(JSON.parse(data));
  });
});



module.exports = router;
