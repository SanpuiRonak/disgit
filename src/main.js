const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");

const logAct = require("debug")("Log Activity");
const token = process.env.TOKEN;
const client = new Discord.Client();

client.once("ready", () => {
  logAct(`Logged in as ${client.user.tag}!`);
});

client.login(token);
