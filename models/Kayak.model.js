const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kayakSchema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerType: {
      type: String,
      required: true,
      enum: ["Club Boat", "Private Boat"],
    },
    name: { type: String, required: true },
    model: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Touring Kayak", "Sea Kayak", "Racing Kayak", "Wildwater Kayak"],
    },
    material: {
      type: String,
      required: true,
      enum: [
        "Plastic",
        "Fiberglass",
        "Wood",
        "Kevlar/Carbon Fibre Laminate",
        "Other",
      ],
    },
    characteristics: { type: String, required: true },
    seats: { type: Number, required: true },
    paddlerSize: { type: String, enum: ["small", "medium", "large"] },
    stability: { type: Number, required: true },
    speed: { type: Number, required: true },
    capacity: { type: Number, required: true },
    hasBulkheads: { type: Boolean, required: true },
    steering: {
      type: String,
      enum: ["Skeg", "Rudder", "Skudder", "Skeg & Rudder", "Tiller", "None"],
    },
    description: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    imageUrl: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Kayak = mongoose.model("Kayak", kayakSchema);
module.exports = Kayak;
