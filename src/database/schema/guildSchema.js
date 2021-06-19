const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID:Number,            //guildID= Discord ServerID
    issueChannelID:Number,        //Discord server's channel ID
    PRChannelID:Number
  });
  
  module.exports = { guildSchema };