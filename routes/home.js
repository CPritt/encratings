const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Ratings = require("../models/ratings");
const Media = require("../models/media");
const bcrypt = require("bcrypt");
const { isAuthenticated } = require("../middleware/auth");

router.get('/', isAuthenticated, async (req, res) => {
    res.sendFile(__dirname + '/../views/home.html');
});

    
router.post('/add', isAuthenticated, async (req, res) => {
    try{
        const userId = req.session.userId;

        const media = new Media({
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
        });
        await media.save();

        media.ratings.push(rating_id);
        await media.save();

        res.redirect('/home');
    } catch (err) {
        console.error("Error adding media:", err);
        res.status(500).json({ message: "Server error while adding media" });
    }
})

module.exports = router;