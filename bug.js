const express = require('express');
const app = express();
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Missing error handling for invalid userId
  db.getUser(userId, (err, user) => {
    if (err) {
      // Error handling is missing here
      res.status(500).send('Internal Server Error');
    } else if (user) {
      res.json(user);
    } else {
      //Missing error handling for user not found
      res.status(404).send('User not found');
    }
  });
});

//Additional error handling for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});