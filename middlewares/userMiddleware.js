import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// middleware to ensure user is not logged in already
const noAuthAPI = async (req, res, next) => {
  try {
    if (req.headers.authorization)
      return res.status(400).json({ message: "Already logged in" });
    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// middleware to ensure user is logged in
const userAuthAPI = async (req, res, next) => {
  try {
    // check if token is provided
    if (!req.headers.authorization)
      return res.status(401).json({ message: "Unauthorized" });

    // decode token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user from db
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(decoded.id),
      token: token,
    });

    // check if user exists
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // attach user object to res.locals
    res.locals.user = user;
    return next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session expired! Please login again.",
        redirect: "/login.ejs",
      });
    }
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Malformed token! Please login again.",
        redirect: "/login.ejs",
      });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ensure user is not logged in already and redirect to home page if they are
const noAuthPage = async (req, res, next) => {
  try {
    if (req.cookies.token) return res.redirect("/");
    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ensure user is logged in otherwise redirect to login page
const userAuthPage = async (req, res, next) => {
  const sendToLogin = () => {
    res.clearCookie("token");
    return res.redirect("/login");
  };

  try {
    // check if token is provided
    if (!req.cookies.token) return sendToLogin();

    // decode token
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user from db
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(decoded.id),
      token: token,
    });

    // check if user exists
    if (!user) return sendToLogin();

    // attach user object to res.locals
    res.locals.user = user;
    return next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return sendToLogin();
    }
    if (e instanceof jwt.JsonWebTokenError) {
      return sendToLogin();
    }
    console.log(e);
    return sendToLogin();
  }
};

export  { noAuthAPI, userAuthAPI, noAuthPage, userAuthPage};
