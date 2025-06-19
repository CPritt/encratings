const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
   const { userName, password } = req.body;

   try {
      const user = await User.findOne({ userName });
      if (!user) {
         return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid password" });
      }

      req.session.userId = user._id;
      
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Error saving session" });
        }

        console.log("User logged in:", user.userName);
        res.redirect("/home");
      });
   } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error during login" });
   }
});

module.exports = router;
