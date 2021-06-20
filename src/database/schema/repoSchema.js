const mongoose = require("mongoose");
const { guildSchema } = require("./guildSchema");

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,

  guilds: [guildSchema],
  lastIssueTimeStamp: { type: Date, default: Date.now },
  lastPRTimeStamp: { type: Date, default: Date.now },
});

module.exports = { repoSchema };
