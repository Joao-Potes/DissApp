const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const userRoute = require("./router/userRoute.js");
const compilerRoute = require("./router/compilerRoute.js");
const { compile } = require("ejs");

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));

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
app.get("/chat", (req, res) => res.render("chat"));
app.get("/language", (req, res) => res.render("langChoice"));
app.get("/challenges", (req, res) => res.render("challenges"));

app.use(userRoute);
app.use(compilerRoute);

// Create an HTTP server out of the Express app
const server = http.createServer(app);
// Create a Socket.IO server attached to the HTTP server

const io = socketIo(server);

const chatController = require("./Controllers/chatServerController");
// Use the chat controller
chatController(io);

server.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
