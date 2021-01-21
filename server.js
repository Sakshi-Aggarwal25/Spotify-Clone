const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const logger = require('./middleware/logger');
const fs = require("fs");
const exphbs = require("express-handlebars");
var cookieParser = require('cookie-parser');
var cors = require("cors");

// Init iddleware => everytime we make a request,
// the middleware is going to run.
app.use(logger);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + "/dist/spotify"));
app.use(cors());
app.use('/playlist', require('./routes/api/playlist'));
app.use('/search-lib', require('./routes/api/songlist'));
app.use('/charts', require('./routes/api/charts'));
app.use('/', require('./routes/api/users'));

app.use(cookieParser())

app.get('/cookies', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  res.send(req.cookies);
})

app.get("/*", (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);
server.listen(port, () => console.log("Running..."));
