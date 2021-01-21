const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");

const playlist = "./src/app/API/playlist.json";

//Get playlists of a given user --> will have to pass userID
router.get("/", (req, res) => {
    console.log("Reading playlists");
    fs.readFile(playlist, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      const pl = JSON.parse(data);
      const p = pl.filter((d) => d.userID === "1009");
      res.send(p);
    });
  });
  
  //Get songs of a given playlist ID
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log("Reading playlist with ID", id);
  
    fs.readFile(playlist, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      var lists = JSON.parse(data);
      const found = lists.some((list) => list.id === id);
      if (found) {
        const li = lists.filter((list) => list.id === id);
        res.json(li);
      } else {
        res.status(400).json({ msg: `Playlist not found with ID of ${id}` });
      }
    });
  });
  
  //Create Playlist
  router.post("/", (req, res) => {
    // console.log(req);
    const newPlaylist = {
      name: req.body.name,
      id: uuid.v4(),
      song: req.body.song,
      userID: req.body.userID,
    };
  
    if (!newPlaylist.name || !newPlaylist.userID) {
      return res.status(400).json({ msg: "Please include a name and userID" });
    }
    fs.readFile(playlist, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      var lists = JSON.parse(data);
      lists.push(newPlaylist);
      fs.writeFile(playlist, JSON.stringify(lists), (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      });
    });
  });
  
  //Update Playlist
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    console.log("Reading playlist with ID for Update", id);
    fs.readFile(playlist, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      var lists = JSON.parse(data);
      const found = lists.find((list) => list.id === id);
      if (found) {
        const updatePlaylist = {
          name: req.body.name ? req.body.name : found.name,
          id: found.id,
          songs: req.body.songs ? req.body.songs : found.songs,
          userID: found.userID,
        };
        console.log(updatePlaylist);
        const li = lists.filter((list) => list.id !== id);
        li.push(updatePlaylist);
  
        fs.writeFile(playlist, JSON.stringify(li), (err) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/");
        });
      } else {
        res.status(400).json({ msg: `Playlist not found with ID of ${id}` });
      }
    });
  });
  
  //Delete Playlist
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log("Reading playlist with ID", id);
  
    fs.readFile(playlist, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      var lists = JSON.parse(data);
      const found = lists.some((list) => list.id === id);
      if (found) {
        const li = lists.filter((list) => list.id !== id);
        res.json(li);
      } else {
        res.status(400).json({ msg: `Playlist not found with ID of ${id}` });
      }
    });
  });

  module.exports = router;