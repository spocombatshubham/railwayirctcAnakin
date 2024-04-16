const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');

// login and authentication end points
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // authentication
  db.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // jwt token handling
    if (results.length > 0) {
      const token = jwt.sign({ username, role: results[0].role }, 'secret_key');
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
