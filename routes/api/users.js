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
      fs.writeFile(registeredUsers, JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      });
    }
  });
});


// --------------------------------------------------

const auth = () => {
  return (req, res, next) => {
      passport.authenticate('local', (error, user, info) => {
          if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
          req.login(user, function(error) {
              if (error) return next(error);
              next();
          });
      })(req, res, next);
  }
}

// --------------------------------------------------

//Login
router.get("/login" , (req, res) => {
  try {
    console.log("Checking Users");
    fs.readFile(registeredUsers, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("queries" + JSON.stringify(req.query));
      let id = req.query.name;
      let pass = req.query.password;
      let users = JSON.parse(data);
      const found = users.some(
        (user) => user.name === id && user.password == pass
      );
      // console.log("59", found);
      if (found) {
        console.log("found");
        const user = users.filter(
          (user) => user.name === id && user.password == pass
        );
        req.login(user[0], function (err) {
          if (err) {
            return next(err);
          }
          console.log("sesson: " + req.session);
          console.log("user Id" + req.session.passport.user);
        // return res.redirect('/playlist/' + req.session.passport.user);

          // console.log("user " + req.user.name);
          // console.log("Auth " + req.isAuthenticated());

          // passport.authenticate("local", {
          //   successRedirect: "/",
          //   failureRedirect: "/login",
          //   failureFlash: "Invalid username or password.",
          // })

          return res.json(user);
        });
      } else {
        res.status(400).json({
          msg: `User not found with name = ${id} and password = ${pass}`,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// router.post("/login", passport.authenticate("local"), function (req, res) {
//   // If this function gets called, authentication was successful.
//   console.log("Post Login");
//   res.redirect("http://localhost:3001//playlist/" + req.user.id);
// });

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: "Invalid username or password.",
  })
);

module.exports = router;
