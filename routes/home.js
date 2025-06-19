const express = require("express");
const router = express.Router();
const Ratings = require("../models/ratings");
const Media = require("../models/media");
const { isAuthenticated } = require("../middleware/auth");

router.get('/media', isAuthenticated, async (req, res) => {
    try{
        const media = await Media.find();
        res.json(media);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    });


router.post('/add', isAuthenticated, async (req, res) => {
    try{
        const userId = req.session.userId;

        const media = new Media({
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            addedBy: userId,
        });
        await media.save();

        const rating = new Ratings({
            userId: userId,
            mediaId: media._id,
            rating: req.body.rating,
            comment: req.body.comment,
        });

        await rating.save();
        media.ratings.push(rating._id);
        await media.save();

        res.redirect('/home');
    } catch (err) {
        console.error("Error adding media:", err);
        res.status(500).json({ message: "Server error while adding media" });
    }
})

module.exports = router;