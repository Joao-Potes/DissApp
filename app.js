const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const userRoute = require("./router/userRoute.js");
const compilerRoute = require("./router/compilerRoute.js");
const indexRoute = require("./router/indexRoute.js");
const i18nRoute = require("./router/i18nRoute.js");
const { compile } = require("ejs");
const i18n = require("./i18n.js");
const cookieParser = require("cookie-parser");  


mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use(i18n.init);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoute);
app.use(userRoute);
app.use('/lang',i18nRoute); 
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
