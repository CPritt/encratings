const mongoose = require("mongoose");
const media = require("./media");

const watchedSchema = new mongoose.Schema({
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

   mediaType: {
      type: String,
   },

   watchedDate: {
      type: Date,
      default: Date.now,
   },

   status: {
      type: String,
      enum: ["watched", "watching", "to-watch"],
      default: "to-watch",
   },
});

module.exports = mongoose.model("Watched", watchedSchema);
