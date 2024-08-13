const express = require("express");
const router = express.Router();
const Kayak = require("../models/Kayak.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

// Post /kayaks Create a new kayak

router.post("/kayaks", (req, res, next) => {
  Kayak.create({
    user_id: req.body.user_id,
    ownerType: req.body.ownerType,
    name: req.body.name,
    type: req.body.type,
    material: req.body.material,
    model: req.body.model,
    characteristics: req.body.characteristics,
    seats: req.body.seats,
    paddlerSize: req.body.paddlerSize,
    stability: req.body.stability,
    speed: req.body.speed,
    capacity: req.body.capacity,
    steering: req.body.steering,
    hasBulkheads: req.body.hasBulkheads,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    reviews: req.body.reviews,
  })
    .then((createdKayak) => {
      console.log("Kayak created", createdKayak);
      res.status(201).json(createdKayak);
    })
    .catch((error) => {
      console.error("Error while creating kayak", error);
      error.message = "Failed to create kayak";
      error.status = 500;
      next(error);
    });
});

// Get /kayaks - Retrieves all kayaks in the database collection

router.get("/kayaks", (req, res, next) => {
  Kayak.find()
    .populate("user_id", "reviews")
    .then((kayaks) => {
      console.log("Kayaks found", kayaks);
      res.status(200).json(kayaks);
    })
    .catch((error) => {
      console.error("Error while retrieving kayaks", error);
      error.message = "Failed retrieve kayaks";
      error.status = 500;
      next(error);
    });
});

// Get /kayaks/users/:id - Retrieves all kayaks for one user
router.get("/kayaks/users/:userId", (req, res, next) => {
  const userId = req.params.userId;

  Kayak.find({ user_id: userId })
    .then((kayaks) => {
      if (kayaks.length > 0) {
        console.log("Retrieved Kayaks for User ->", kayaks);
        res.status(200).json(kayaks);
      } else {
        const error = new Error(`No kayaks found for user with id ${userId}`);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving kayaks ->", error);
      error.message = "Failed to retrieve kayaks";
      error.status = 500;
      next(error);
    });
});

// Get /kayaks/:id - Retrieves a specific kayak by its id

router.get("/kayaks/:kayakId", (req, res, next) => {
  const kayakId = req.params.kayakId;

  Kayak.findById(kayakId)
  .populate("user_id") // Populate the user_id field
  .then((kayak) => {
      if (kayak) {
        console.log("Retrieved Kayak ->", kayak);
        res.status(200).json(kayak);
      } else {
        const error = new Error(`Kayak with id ${kayakId} not found`);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving kayak ->", error);
      error.message = "Failed to retrieve kayak";
      error.status = 500;
      next(error);
    });
});

// Put /kayaks/:id - Updates a specific kayak by its id

router.put("/kayaks/:kayakId", (req, res, next) => {
  const kayakId = req.params.kayakId;

  Kayak.findByIdAndUpdate(kayakId, req.body, { new: true })
    .then((updatedKayak) => {
      console.log("Kayak updated ->", updatedKayak);
      res.status(204).json(updatedKayak);
    })
    .catch((error) => {
      console.error("Error while updating kayak ->", error);
      error.message = "Failed to update kayak";
      error.status = 500;
      next(error);
    });
});

// Delete /kayaks/:id - Deletes a specific kayak by its id

router.delete("/kayaks/:kayakId", (req, res, next) => {
  const kayakId = req.params.kayakId;

  Kayak.findByIdAndDelete(kayakId)
    .then((result) => {
      if (result) {
        console.log("Kayak deleted");
        res.status(204).json();
      } else {
        const error = new Error(`Kayak with id ${kayakId} not found`);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while deleting kayak ->", error);
      error.message = "Failed to delete kayak";
      error.status = 500;
      next(error);
    });
});

// POST "/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

module.exports = router;
