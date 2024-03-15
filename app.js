const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.get("/index", (req, res) => res.render("index.ejs"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/policy", (req, res) => res.render("policy"));
app.get("/feedback", (req, res) => res.render("feedback"));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
