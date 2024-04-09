const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const userRoute = require("./router/userRoute.js");
const compilerRoute = require("./router/compilerRoute.js");
const { compile } = require("ejs");

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use('/js', express.static(__dirname + '/js'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/policy", (req, res) => res.render("policy"));
app.get("/feedback", (req, res) => res.render("feedback"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/ide", (req, res) => res.render("ide"));


app.use(userRoute);
app.use(compilerRoute);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
