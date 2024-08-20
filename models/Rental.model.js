const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    kayak_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kayak",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
