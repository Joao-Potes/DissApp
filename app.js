const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const userRoute = require("./router/userRoute.js");

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use(express.json());
app.get("/index", (req, res) => res.render("index.ejs"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/policy", (req, res) => res.render("policy"));
app.get("/feedback", (req, res) => res.render("feedback"));
app.get("/addUser", (req, res) => res.render("addUser"));

app.use(userRoute);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
