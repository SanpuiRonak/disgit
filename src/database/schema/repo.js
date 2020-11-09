const mongoose = require("mongoose");
const { commitSchema } = require("./commit");

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoURL: String,
  commit: commitSchema,
});

module.exports = { repoSchema };
