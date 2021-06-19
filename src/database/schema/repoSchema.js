const mongoose = require("mongoose");
const { commitSchema } = require("./commitSchema");
const { issueSchema } = require("./issueSchema");
const {guildSchema} = require("./guildSchema")

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,
  issueChannel: Number,
  guild:[guildSchema],
  lastIssueTimeStamp : { type : Date, default: Date.now },
  lastPRTimeStamp : { type : Date, default: Date.now }

});

module.exports = { repoSchema };
