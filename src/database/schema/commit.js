const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema({
  channelId: Number,
  apiUrl: String,
  commitCount: Number,
});

module.exports = { commitSchema };
