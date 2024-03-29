import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    // check if all fields are provided
    if (!req.body.name || !req.body.email || !req.body.password)
      return res
        .status(400)
        .json({ message: "Name, email and password required" });
    const email = req.body.email.toLowerCase();
    // check if user exists
    const existing = await User.findOne({ email: email });
    if (existing)
      return res.status(401).json({
        message: "A user with this email already exists",
        redirect: "/login",
      });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create user
    const user = await User.create({
      name: req.body.name,
      email: email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    // check if all fields are provided
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Email and password required" });
    const email = req.body.email.toLowerCase();
    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // check if password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    // generate auth token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Set the auth token as a cookie
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      token,
      redirect: "/",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
