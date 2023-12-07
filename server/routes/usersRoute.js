const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register a new user
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "Email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    return res.send({
      success: true,
      message: "User created successfully , please login",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    // create and assign a token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    return res.send({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// get logged in user details
router.get("/get-logged-in-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userIdFromToken);
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
    return res.send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all the users (patrons)
router.get("/get-all-users/:role", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }).sort({
      createdAt: -1,
    });
    return res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//search user
router.get("/search/:role", async (req, res) => {
  const searchTerm = req.query.term; // Get the search term from the query parameter
  console.log(req.params.role);

  try {
    // Your logic to search books in the database using the searchTerm
    // For example, if using MongoDB:
    let users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive title search
        { email: { $regex: searchTerm, $options: "i" } }, // Case-insensitive author search
        { phone: { $regex: searchTerm, $options: "i" } }, // Case-insensitive category search
      ],
    });

    users = users.map((user) => {
      if (user.role !== req.params.role) {
        return;
      }
      return user;
    });

    users = users.filter((user) => {
      return user !== undefined;
    });

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//delete user
router.delete("/delete-user/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get user by id
router.get("/get-user-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "User does not exist",
    });
  }
});

module.exports = router;
