const mongoose = require("mongoose");
const { guildSchema } = require("./guildSchema");

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,

  guilds: [guildSchema],
  lastIssueTimeStamp: {
    type: String,
    // default: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss[Z]"),
    default: Date.now(),
  },
  lastPRTimeStamp: {
    type: String,
    // default: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss[Z]"),
    default: Date.now(),
  },
});

module.exports = { repoSchema };
