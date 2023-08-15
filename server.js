require("dotenv").config();
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const path = require("path");

// import sequelize connection
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname, "public/homepage.html"))
);
app.get("/results", (req, res) =>
  res.sendFile(path.join(__dirname, "public/search-result.html"))
);

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
