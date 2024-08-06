const express = require("express");
const router = express.Router();
const Kayak = require("../models/Kayak.model");

// Post /kayaks Create a new kayak

router.post("/kayaks", (req, res, next) => {
  Kayak.create(req.body)({
    user_id: req.body.user_id,
    ownerType: req.body.ownerType,
    name: req.body.name,
    boatType: req.body.boatType,
    characteristics: req.body.characteristics,
    seats: req.body.seats,
    stability: req.body.stability,
    speed: req.body.speed,
    hasBulkheads: req.body.hasBulkheads,
    description: req.body.description,
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
    .populate ("user_id", "reviews")
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

// Get /kayaks/:id - Retrieves a specific kayak by its id

router.get("/kayaks/:kayakId", (req, res, next) => {
    const kayakId = req.params.kayakId;

    Kayak.findById(kayakId)
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

module.exports = router;