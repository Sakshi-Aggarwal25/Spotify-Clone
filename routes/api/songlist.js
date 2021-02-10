const express = require("express");
const router = express.Router();
const fs = require("fs");
const songsList = "./src/app/API/songsList.json";

// Get songs list
router.get("/", (req, res) => {
  console.log("Reading Songs list");
  fs.readFile(songsList, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.parse(data));
  });
});

//Search from song list
router.get("/searchName", (req, res) => {
  console.log("queries" + JSON.stringify(req.query));
  const searchText = req.query.find.toLowerCase();
  console.log("searchText : " + searchText)
  console.log("checking Songs list");
  fs.readFile(songsList, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let songs = JSON.parse(data);
    const song = songs.filter(
      (song) => song.name.toLowerCase().indexOf(searchText) !== -1
    );
    res.json(song);
  });
});

//Search from song list -> Artist
router.get("/searchArtist", (req, res) => {
  console.log("queries" + JSON.stringify(req.query));
  const searchText = req.query.find.toLowerCase();
  console.log("searchText : " + searchText)
  console.log("checking Songs list");
  fs.readFile(songsList, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let songs = JSON.parse(data);
    const song = songs.filter(
      (song) => song.musician.toLowerCase().indexOf(searchText) !== -1
    );
    res.json(song);
  });
});

module.exports = router;