const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");

// Post /reviews Create a new review

router.post("/reviews", (req, res, next) => {
  // console.log("req.body", req.body);
  // return;
  Review.create({
    rating: req.body.rating,
    reviewContent: req.body.reviewContent,
    user_id: req.body.user_id,
    kayak_id: req.body.kayak_id,
  })
    .then((createdReview) => {
      console.log("Review created", createdReview);
      res.status(201).json(createdReview);
    })
    .catch((error) => {
      console.error("Error while creating review ->", error);
      error.message = "Failed to create review";
      error.status = 500;
      next(error);
    });
});

// Get /reviews - Retrieves all reviews in the database collection
router.get("/reviews", (req, res, next) => {
  Review.find()
    .populate("user_id", "name email") // Populate the user field
    .then((reviews) => {
      console.log("Reviews found ->", reviews);
      res.status(200).json(reviews);
    })
    .catch((error) => {
      console.error("Error while retrieving reviews ->", error);
      error.message = "Failed to retrieve reviews";
      error.status = 500;
      next(error);
    });
});

// Get /reviews/:reviewId - Retrieves a specific review by its id
router.get("/reviews/:reviewId", (req, res, next) => {
  const reviewId = req.params.reviewId;

  Review.findById(reviewId)
    .then((review) => {
      if (review) {
        console.log("Review found ->", review);
        res.status(200).json(review);
      } else {
        const error = new Error(`Review with id ${reviewId} not found`);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving review ->", error);
      error.message = "Failed to retrieve review";
      error.status = 500;
      next(error);
    });
});
// Put /reviews/:reviewId - Updates a specific review by its id

router.put("/reviews/:reviewId", (req, res, next) => {
  const reviewId = req.params.reviewId;

  Review.findByIdAndUpdate(reviewId, req.body, { new: true })

    .then((updatedReview) => {
      console.log("Review updated", updatedReview);
      res.status(204).json(updatedReview);
    })
    .catch((error) => {
      console.error("Error while updating review ->", error);
      error.message = "Failed to update review";
      error.status = 500;
      next(error);
    });
});

// Delete /reviews/:reviewId - Deletes a specific review by its id
router.delete("/reviews/:reviewId", (req, res, next) => {
  const reviewId = req.params.reviewId;

  Review.findByIdAndDelete(reviewId)
    .then((result) => {
      if (result) {
        console.log("Review deleted!");
        res.status(204).send();
      } else {
        const error = new Error(`Review with id ${reviewId} not found`);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while deleting review ->", error);
      error.message = "Failed to delete review";
      error.status = 500;
      next(error);
    });
});

// Get /reviews/kayaks/:kayakId - Retrieves all reviews for a specific kayak

router.get("/reviews/kayaks/:kayakId", (req, res, next) => {
  const kayakId = req.params.kayakId;

  Review.find({ kayak_id: kayakId })
    .populate("user_id", "name email") // Populate the user field
    .then((reviews) => {
      console.log("Reviews found ->", reviews);
      res.status(200).json(reviews);
    })
    .catch((error) => {
      console.error("Error while retrieving reviews ->", error);
      error.message = "Failed to retrieve reviews";
      error.status = 500;
      next(error);
    });
});
// Get /reviews/users/:userId - Retrieves all reviews for a specific user
router.get("/reviews/users/:userId", (req, res, next) => {
  const userId = req.params.userId;

  Review.find({ user_id: userId })
    .then((reviews) => {
      console.log("Reviews found ->", reviews);
      res.status(200).json(reviews);
    })
    .catch((error) => {
      console.error("Error while retrieving reviews ->", error);
      error.message = "Failed to retrieve reviews";
      error.status = 500;
      next(error);
    });
});

module.exports = router;
