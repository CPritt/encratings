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

      res.json({
         message: "Login successful",
         user: {
            userName: user.userName,
            email: user.email,
         },
      });
   } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error during login" });
   }
});

module.exports = router;
