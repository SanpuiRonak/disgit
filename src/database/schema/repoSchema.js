const mongoose = require("mongoose");
const { guildSchema } = require("./guildSchema");
const moment = require("moment");

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,

  guilds: [guildSchema],
  lastIssueTimeStamp: {
    type: String,
    default: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss[Z]"),
  },
  lastPRTimeStamp: {
    type: String,
    default: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss[Z]"),
  },
});

module.exports = { repoSchema };
