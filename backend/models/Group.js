const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: String }],
  admins: [{ type: String }],
});

module.exports = mongoose.model("Group", groupSchema);