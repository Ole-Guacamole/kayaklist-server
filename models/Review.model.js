const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const ReviewSchema = new Schema({
  Rating:   { type: Number, required: true },

  reviewContent: { type: String, required: true },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  kayak_id: { type: mongoose.Schema.Types.ObjectId, ref: "Kayak" },

});

// CREATE MODEL
// The model() method defines a model (Review) and creates a collection (reviews) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Review" --> "reviews"
const Review = mongoose.model("Review", reviewSchema);

// EXPORT THE MODEL
module.exports = Review;
