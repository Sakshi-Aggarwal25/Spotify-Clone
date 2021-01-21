const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");

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


  module.exports = router;