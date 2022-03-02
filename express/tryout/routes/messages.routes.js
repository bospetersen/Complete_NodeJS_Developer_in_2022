const express = require('express');

const messagesController = require('../controllers/messages.controllers')
const messageRoutes = express.Router();

messageRoutes.get('/', messagesController.getMessages);
messageRoutes.post('/', messagesController.postMessage);

module.exports = messageRoutes