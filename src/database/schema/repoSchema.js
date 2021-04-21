const mongoose = require("mongoose");
const { commitSchema } = require("./commitSchema");
const { issueSchema } = require("./issueSchema");

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,
  // commit: commitSchema,
  issue: issueSchema,
});

module.exports = { repoSchema };