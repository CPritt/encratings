const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  type: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  avgRating: {
    type: Number,
    min: 0,
    max: 10,
  },

  coverImage: {
    type: String,
  },
  // OPTINOAL FIELDS

  director: {
    type: String,
  },

  author: {
    type: String,
  },

  platform: {
    type: String,
  },

  artist: {
    type: String,
  },

  developer: {
    type: String,
  },

  ratings:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ratings",
    },
  ],
});

module.exports = mongoose.model("Media", mediaSchema);
