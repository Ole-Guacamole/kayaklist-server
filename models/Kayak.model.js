const mongoose = require('mongoose');
const Review = require('./Review.model');
const Schema = mongoose.Schema;

const kayakSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerType: { 
        type: String, 
        required: true, 
        enum: ['club boat', 'private boat'] 
      },
    name: { type: String, required: true },
    boatType: { type: String, rquiered: true },
    characteristics: { type: String, required: true },
    seats: { type: Number, required: true },
    stability: { type: Number, required: true },
    speed: { type: Number, required: true },
    hasBulkheads: { type: Boolean, required: true },
    description: {type: String, required: true},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
})

const Kayak = mongoose.model("Kayak", kayakSchema);
module.exports = Kayak;