const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kayakSchema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerType: {
      type: String,
      required: true,
      enum: ["club boat", "private boat"],
    },
    name: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    material: { type: String, required: true },
    characteristics: { type: String, required: true },
    seats: { type: Number, required: true },
    paddlerSize: { type: String },
    stability: { type: Number, required: true },
    speed: { type: Number, required: true },
    hasBulkheads: { type: Boolean, required: true },
    steering: { type: String },
    description: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    imageUrl: {type: String}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Kayak = mongoose.model("Kayak", kayakSchema);
module.exports = Kayak;
