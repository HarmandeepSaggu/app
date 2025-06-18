const Message = require('../models/Message');

// GET /api/messages/private/:user1/:user2
exports.getPrivateMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      isGroup: false,
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ]
    })
    .sort({ timestamp: 1 })
    .populate('from', 'username');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load private messages' });
  }
};

// GET /api/messages/group/:groupId
exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.find({
      isGroup: true,
      to: groupId
    })
    .sort({ timestamp: 1 })
    .populate('from', 'username');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load group messages' });
  }
};
