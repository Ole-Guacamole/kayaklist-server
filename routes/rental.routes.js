const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental.model');
const Kayak = require('../models/Kayak.model');

// Create a new rental
router.post('/rentals', (req, res) => {
  const { kayak_id, user_id, startDate, endDate } = req.body;
  

  // Check if the kayak is already rented for the given date range
  Rental.findOne({
    kayak_id: kayak_id,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ]
  })
  .then(existingRental => {
    if (existingRental) {
      return res.status(400).json({ message: 'Kayak is already rented for this date range' });
    }

    // Create a new rental
    const rental = new Rental({ kayak_id: kayakId, user_id: user_id, startDate, endDate });
    return rental.save();
  })
  .then(rental => {
    // Update the kayak's rentals
    return Kayak.findByIdAndUpdate(kayakId, { $push: { rentals: rental._id } })
      .then(() => res.status(201).json(rental));
  })
  .catch(error => {
    res.status(500).json({ message: 'Error creating rental', error });
  });
});

// Get all rentals for a specific kayak
router.get('/rentals/kayaks/:kayakId', (req, res) => {
  const kayakId = req.params.kayakId;

  Rental.find({ kayak_id: kayakId })
    .populate('user_id', 'name email')
    .then(rentals => res.status(200).json(rentals))
    .catch(error => res.status(500).json({ message: 'Error retrieving rentals', error }));
});

// Delete a rental
router.delete('/rentals/:rentalId', (req, res) => {
  const rentalId = req.params.rentalId;

  Rental.findByIdAndDelete(rentalId)
    .then(rental => {
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      // Update the kayak's rentals
      return Kayak.findByIdAndUpdate(rental.kayak_id, { $pull: { rentals: rental._id } })
        .then(() => res.status(200).json({ message: 'Rental deleted' }));
    })
    .catch(error => {
      res.status(500).json({ message: 'Error deleting rental', error });
    });
});

module.exports = router;