const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const logger = require("./middleware/logger");
const fs = require("fs");
const exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");

app.use(cors());
app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));

// Init iddleware => everytime we make a request,
// the middleware is going to run.
app.use(logger);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.static(__dirname + "/dist/spotify"));

app.use(
  session({
    secret: "dcdkkej8cue8fhn36q21",
    resave: false,
    saveUninitialized: true,
  })
);
// app.all('*',function(req, res, next){
//   //Origin is the HTML/AngularJS domain from where the ExpressJS API would be called
//       res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//       res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Content-Type');

//   //make sure you set this parameter and make it true so that AngularJS and Express are able to exchange session values between each other
//       res.header("Access-Control-Allow-Credentials", "true");
//       next();
//   });

app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res , next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

app.use("/playlist", require("./routes/api/playlist"));
app.use("/search-lib", require("./routes/api/songlist"));
app.use("/charts", require("./routes/api/charts"));
app.use("/", require("./routes/api/users"));

// app.use('/session', function(req, res){
//   if(req.session.count){

//   } else{

//   }
// })
app.get("/cookies", function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
  res.send(req.cookies);
});

app.get("/*", (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);
server.listen(port, () => console.log("Running..."));
