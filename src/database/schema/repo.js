const mongoose = require("mongoose");
const { commitSchema } = require("./commit");
const { issueSchema } = require("./issue");

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,
  // commit: commitSchema,
  issue: issueSchema,
});

module.exports = { repoSchema };
