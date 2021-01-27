const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const session = require("express-session");

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
      } else{
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
  
  //Login
  router.get("/login", (req, res) => {
    try{
      console.log("Checking Users");
      fs.readFile(registeredUsers, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log("queries" + JSON.stringify(req.query));
        let id = req.query.name;
        let pass = req.query.password;
        let users = JSON.parse(data);
        const found = users.some((user) => user.name === id && user.password == pass);
        console.log("59", found);
        if (found) {
          console.log("found");
          const user = users.filter((user) => user.name === id && user.password == pass);
          // req.session.name = user.name;
          // req.session.userID = user.userID;
          res.json(user);
        } else {
          res.status(400).json({ msg: `User not found with name = ${id} and password = ${pass}` });
        }
      });
    }
    catch(err){
      console.loh(err);
    }
    
  });

  module.exports = router;