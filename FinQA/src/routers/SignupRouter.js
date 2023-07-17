const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  console.log('sign up');
  const user = new User({
    username,
    email,
    password,
  });

  user
    .save()
    .then(() => {
      res.send('User registered successfully');
    })
    .catch((error) => {
      console.error('Error saving user to database', error);
      res.status(500).send('Internal server error');
    });
});

module.exports = router;
