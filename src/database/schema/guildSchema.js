const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildID: String, //guildID= Discord ServerID
  issueChannelID: String, //Discord server's channel ID
  PRChannelID: String,
});

module.exports = { guildSchema };
