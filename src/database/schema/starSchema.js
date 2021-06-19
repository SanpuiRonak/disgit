const mongoose = require("mongoose");

const starSchema = new mongoose.Schema({
    currentStar: Number,
    lastStar: Number,
  });
  
  module.exports = { starSchema };