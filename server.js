const express = require("express");
const http = require("http");
const path = require("path");
const uuid = require("uuid");
const app = express();
const fs = require("fs");
const exphbs = require("express-handlebars");
var cookieParser = require('cookie-parser')

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const songsList = "./src/app/API/songsList.json";
const playlist = "./src/app/API/playlist.json";
const charts = "./src/app/API/charts.json";
const registeredUsers = "./src/app/API/registeredUsers.json";

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + "/dist/spotify"));
app.use(cookieParser())

app.get('/cookies', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  res.send(req.cookies);
})

app.get("/*", (req, res) => res.sendFile(path.join(__dirname)));

// Get songs list
app.get("/search-lib", (Req, res) => {
  console.log("Reading Songs list");
  fs.readFile(songsList, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    res.send(JSON.parse(data));
  });
});

// Get Charts
app.get("/charts", (req, res) => {
  console.log("Reading Charts");
  fs.readFile(charts, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    res.send(JSON.parse(data));
  });
});

//Get playlists of a given user --> will have to pass userID
app.get("/playlist", (req, res) => {
  console.log("Reading playlists");
  fs.readFile(playlist, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let pl = JSON.parse(data);
    const p = pl.filter((d) => d.userID === "1001");
    res.send(p);
  });
});

//Get songs of a given playlist ID
app.get("/playlist/:id", (req, res) => {
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
app.post("/playlist", (req, res) => {
  console.log(req);
  const newPlaylist = {
    name: req.body.name,
    id: uuid.v4(),
    songs: [
      {
        name: "Mirrors",
        id: "1001",
      },
      {
        name: "Rhythm",
        id: "1002",
      },
    ],
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
app.put("/playlist/:id", (req, res) => {
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
app.delete("/playlist/:id", (req, res) => {
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

//Create User
app.post("/signup", (req, res) => {
  console.log(req);
  const newUser = {
    name: req.body.name,
    id: uuid.v4(),
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phone: req.body.phone,
  };

  if (!newUser.name || !newUser.id || !newUser.email || !newUser.password || !newUser.confirmPassword || !newUser.phone) {
    return res.status(400).json({ msg: "Please include all the details of the user" });
  }

  if(newUser.password !== newUser.confirmPassword){
    return res.status(400).json({ msg: "The passwords don't match" });
  }

  fs.readFile(registeredUsers, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    var users = JSON.parse(data);
    const found = users.some((user) => user.email === newUser.email);
    if(found){
      return res.status(400).json({ msg: `User with the email ${newUser.email} already exists` });
    }
  });

  fs.readFile(registeredUsers, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    var users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(registeredUsers, JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  });
});

//Login
app.get("/login", (req, res) => {
  console.log("Checking Users");
  fs.readFile(registeredUsers, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let id = req.body.id;
    let pass = req.body.password;
    let users = JSON.parse(data);
    const found = users.some((user) => user.id === id && user.password == pass);
    if (found) {
      const user = users.filter((user) => user.id === id && user.password == pass);
      res.json(user);
    } else {
      res.status(400).json({ msg: `User not found with ID = ${id} and password = ${pass}` });
    }
  });
});

const server = http.createServer(app);

server.listen(port, () => console.log("Running..."));
