const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/add_train', (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;

  
  if (!train_name || !source || !destination || !total_seats) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  
  db.query('INSERT INTO Trains (train_name, source, destination, total_seats) VALUES (?, ?, ?, ?)', 
           [train_name, source, destination, total_seats], 
           (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Train added successfully' });
    }
  });
});

module.exports = router;
