require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const dbApi = require("./database/api");
const eventHandler = require("./eventHandler");

const deb = require("debug")("main.js: ");
const token = process.env.TOKEN;
const client = new Discord.Client();

const { getEmbed } = require("./embeds/issueEmbed.js");

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
  deb(`Logged in as ${client.user.tag}!`);

  // const temp = client.channels.cache.get("760152956069740596");

  // let { openIssueEvents, closeIssueEvents 

  setInterval(refreshEvents, 30000);

});

async function refreshEvents() {
  const repos = await dbApi.getRepoList();


  repos.forEach((repo) => {
    deb("ok");
    eventHandler.getNewEvents(repo).then((res) => {
      if (res.eventsArray.length > 0) {

        deb("updating stamp: ", res.eventsArray[0].created_at);
        deb("Event Array Length: ", res.eventsArray.length);
        deb("Issues Array Length: ", res.issueEvents.length);

        dbApi.setLastTime(repo.repoURL, res.eventsArray[0].created_at);
        if (res.issueEvents.length > 0) {
          const openIssueEmbed = getEmbed(res.issueEvents);
          repo.guilds.forEach(guild => {
            client.channels.cache.get(guild.issueChannelID).send(openIssueEmbed);
          })
        }
      }
    });
  });
}

// refreshEvents();

client.login(token);
