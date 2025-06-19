const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one user
router.get("/:id", (req, res) => {
  res.send("Get one User");
});


router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    userName: req.body.userName,
    password: hashedPassword,
    email: req.body.email,
  });
  const newUser = await user.save();
  if (!newUser) {
    return res.status(400).json({ message: "Error creating user" });
  }
  res.redirect("/login");
});

module.exports = router;
