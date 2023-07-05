const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Users
const users = [];

// config
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route Import
const crud = require("./routes/crud");
const jwt = require("jsonwebtoken");
app.use("/api/v1", crud);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = {};

  for (let i = 0; users.length; i++) {
    if (users[i].username === username) {
      if (users[i].password === password) {
        user = users[i];
      } else {
        res.status(400).json({ error: "Wrong password" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  }); // token will expire in 2mins
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
  }); // 365 days

  res.cookie("JWTRefreshToken", refreshToken, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  res.status(200).json({ token });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const user = { username, password };

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  }); // token will expire in 2mins
  const refreshToken = jwt.sign(
    { username },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
    }
  ); // 365 days

  users.push(user);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("JWTRefreshToken", refreshToken, options);

  res.status(200).json({ token });
});
exports.users = users;

module.exports = app;
