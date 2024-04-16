const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/book_seat', async (req, res) => {
  const { train_id, user_id, seat_number } = req.body;

  try {
    
    await db.begingtransaction();

    
    const [selectedSeat] = await db.query(
      'SELECT * FROM Seats WHERE train_id = ? AND seat_number = ? FOR UPDATE',
      [train_id, seat_number]
    );

    
    if (selectedSeat.length === 0 || selectedSeat[0].status === 'booked') {
      throw new Error('Seat is not available');
    }

    
    await db.query(
      'INSERT INTO Bookings (train_id, user_id, seat_number) VALUES (?, ?, ?)',
      [train_id, user_id, seat_number]
    );


    await db.commit();

    res.status(200).json({ message: 'Seat bookind done successfully' });
  } catch (error) {
    // logic to rollback the transaction to handld rare case
    await db.rollback();
    console.error(error);
    res.status(500).json({ error: 'Booking failed due to some error' });
  }
});

module.exports = router;
