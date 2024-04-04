import express from "express";
import mongoose from "mongoose";
import userRoute from "./router/userRoute.js";
import indexRoute from "./router/indexRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.JWT_SECRET);

const app = express();
const port = 8000;

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(indexRoute);
app.use( userRoute);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
