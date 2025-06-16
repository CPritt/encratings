const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  mediaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },

  comment: {
    type: String,
    maxlength: 500,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ratings", ratingsSchema);
