const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
var session = require("express-session");
var passport = require("passport");

const registeredUsers = "./src/app/API/registeredUsers.json";

//Create User
router.post("/signup", (req, res) => {
  const newUser = {
    name: req.body.name,
    id: uuid.v4(),
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phone: req.body.phone,
  };

  if (
    !newUser.name ||
    !newUser.id ||
    !newUser.email ||
    !newUser.password ||
    !newUser.confirmPassword ||
    !newUser.phone
  ) {
    return res
      .status(400)
      .json({ msg: "Please include all the details of the user" });
  }

  if (newUser.password !== newUser.confirmPassword) {
    return res.status(400).json({ msg: "The passwords don't match" });
  }

  fs.readFile(registeredUsers, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    var users = JSON.parse(data);
    const found = users.some((user) => user.email === newUser.email);
    if (found) {
      return res
        .status(400)
        .json({ msg: `User with the email ${newUser.email} already exists` });
    } else {
      users.push(newUser);
      console.log("84 " + newUser.id);
        const user_id = newUser.id;
        req.login(user_id , function(err) {
          res.redirect('/');
        })
      fs.writeFile(registeredUsers, JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
        }
        // res.redirect("/");
      });
      
    }
  });
});

//Login
router.get("/login", (req, res) => {
  try {
    console.log("Checking Users");
    fs.readFile(registeredUsers, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("queries " + JSON.stringify(req.query));
      let id = req.query.name;
      let pass = req.query.password;
      let users = JSON.parse(data);
      const found = users.some(
        (user) => user.name === id && user.password == pass
      );
      console.log("59", found);
      console.log(JSON.stringify(req.session));
      if (found) {
        console.log("found");
        const user = users.filter(
          (user) => user.name === id && user.password == pass
        );


        console.log("84 " + user[0].id);
        const user_id = user[0].id;
        req.login(user_id , function(err) {
          res.json(user);
        })


        // req.session.user = user;
        // console.log("session" + req.session.user);
        // console.log(JSON.stringify(req.session));
        // res.json(user);
      } else {
        console.log("session" + req.session.user);
        res
          .status(400)
          .json({
            msg: `User not found with name = ${id} and password = ${pass}`,
          });
      }
    });
  } catch (err) {
    console.loh(err);
  }
});

passport.serializeUser(function(user_id , done) {
  done(null, user_id) ;
});

passport.deserializeUser(function(user_id , done) {
    done(null, user_id );
});

module.exports = router;
