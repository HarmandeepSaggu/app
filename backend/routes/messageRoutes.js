const express = require('express');
const router = express.Router();
const chatController = require('../controllers/messageController');

router.get('/private/:user1/:user2', chatController.getPrivateMessages);


module.exports = router;
