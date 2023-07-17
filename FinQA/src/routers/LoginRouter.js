const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(401).send('Invalid username or password');
        return;
      }

      if (user.password !== password) {
        res.status(401).send('Invalid username or password');
        return;
      }

      res.redirect('/get-started');
    })
    .catch((error) => {
      console.error('Error finding user', error);
      res.status(500).send('Internal server error');
    });
});

module.exports = router;
