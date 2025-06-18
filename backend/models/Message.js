// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   from: String,
//   to: String, // Either username (for private) or group name
//   message: String,
//   isGroup: Boolean,
//   timestamp: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isGroup: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
   seen: { 
    type: Boolean, 
    default: false },
});

module.exports = mongoose.model("Message", messageSchema);