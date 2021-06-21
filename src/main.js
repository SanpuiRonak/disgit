require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const dbApi = require("./database/api");
const eventHandler = require("./eventHandler");

const logAct = require("debug")("Main.js Activity");
const token = process.env.TOKEN;
const client = new Discord.Client();

//New Colection for dyanimacally storing commands
client.commands = new Discord.Collection();
const prefix = ";";
//Get all command files
const commandFiles = fs
  .readdirSync(__dirname + "/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Command event handler
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.once("ready", () => {
  logAct(`Logged in as ${client.user.tag}!`);
});

// setInterval(eventHandler.getIssues, 5000);

function sendEmbed(exampleEmbed) {
  console.log("msg pathachi");
  const channel = client.channels.cache.get(dbApi.getIssueChannel());
  channel.send(exampleEmbed);
}

client.login(token);
