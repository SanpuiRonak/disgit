const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  latestOpen: Number,
  latestClosed: Number,
});

module.exports = { issueSchema };
