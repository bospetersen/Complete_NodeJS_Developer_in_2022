const express = require('express');
const friendsController = require('../controllers/friends.controllers');

const friendsRoutes = express.Router();

// const friendsController = require('../controllers/friends.controllers')

friendsRoutes.use((req, res, next) => {
  console.log(`ip address: ${req.ip}`);
  next();
});


friendsRoutes.post('/', friendsController.postFriend)
friendsRoutes.get('/', friendsController.getAllFriends)
friendsRoutes.get('/:friendsId', friendsController.getSingleFriend)

module.exports = friendsRoutes