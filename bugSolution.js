const express = require('express');
const app = express();
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Validate userId (add more robust validation if needed)
  if (!userId || isNaN(parseInt(userId))) {
    return res.status(400).send('Invalid user ID');
  }
  db.getUser(userId, (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Failed to fetch user');
    } else if (!user) {
      return res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  });
});

//Centralized error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.stack);
  res.status(500).send('Something broke!');
});