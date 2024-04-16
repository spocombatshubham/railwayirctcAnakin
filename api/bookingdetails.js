const express = require('express');
const router = express.Router();
const db = require('./db');

// Route to get specific booking details
router.get('/booking_details/:booking_id', (req, res) => {
  const { booking_id } = req.params;

  // Query the database to fetch booking details
  db.query('SELECT * FROM Bookings WHERE booking_id = ?', [booking_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;
