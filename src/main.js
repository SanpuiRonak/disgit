require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const dbApi = require("./database/api");
// const eventHandler = require("./eventHandler");

const logAct = require("debug")("main.js: ");
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
  logAct(`Logged in as ${client.user.tag}!`);

  const temp = client.channels.cache.get("760152956069740596");
  temp.send(getEmbed({
    "id": "17113765352",
    "type": "IssuesEvent",
    "actor": {
      "id": 10319620,
      "login": "vixson",
      "display_login": "vixson",
      "gravatar_id": "",
      "url": "https://api.github.com/users/vixson",
      "avatar_url": "https://avatars.githubusercontent.com/u/10319620?"
    },
    "repo": {
      "id": 13840241,
      "name": "freeCodeCamp/devdocs",
      "url": "https://api.github.com/repos/freeCodeCamp/devdocs"
    },
    "payload": {
      "action": "closed",
      "issue": {
        "url": "https://api.github.com/repos/freeCodeCamp/devdocs/issues/1553",
        "repository_url": "https://api.github.com/repos/freeCodeCamp/devdocs",
        "labels_url": "https://api.github.com/repos/freeCodeCamp/devdocs/issues/1553/labels{/name}",
        "comments_url": "https://api.github.com/repos/freeCodeCamp/devdocs/issues/1553/comments",
        "events_url": "https://api.github.com/repos/freeCodeCamp/devdocs/issues/1553/events",
        "html_url": "https://github.com/freeCodeCamp/devdocs/issues/1553",
        "id": 907541390,
        "node_id": "MDU6SXNzdWU5MDc1NDEzOTA=",
        "number": 1553,
        "title": "Cannot add space in search box text",
        "user": {
          "login": "vixson",
          "id": 10319620,
          "node_id": "MDQ6VXNlcjEwMzE5NjIw",
          "avatar_url": "https://avatars.githubusercontent.com/u/10319620?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/vixson",
          "html_url": "https://github.com/vixson",
          "followers_url": "https://api.github.com/users/vixson/followers",
          "following_url": "https://api.github.com/users/vixson/following{/other_user}",
          "gists_url": "https://api.github.com/users/vixson/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/vixson/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/vixson/subscriptions",
          "organizations_url": "https://api.github.com/users/vixson/orgs",
          "repos_url": "https://api.github.com/users/vixson/repos",
          "events_url": "https://api.github.com/users/vixson/events{/privacy}",
          "received_events_url": "https://api.github.com/users/vixson/received_events",
          "type": "User",
          "site_admin": false
        },
        "labels": [
          {
            "id": 62502024,
            "node_id": "MDU6TGFiZWw2MjUwMjAyNA==",
            "url": "https://api.github.com/repos/freeCodeCamp/devdocs/labels/bug",
            "name": "bug",
            "color": "b60205",
            "default": true,
            "description": ""
          },
          {
            "id": 1926349504,
            "node_id": "MDU6TGFiZWwxOTI2MzQ5NTA0",
            "url": "https://api.github.com/repos/freeCodeCamp/devdocs/labels/help%20wanted",
            "name": "help wanted",
            "color": "5319e7",
            "default": true,
            "description": ""
          }
        ],
        "state": "closed",
        "locked": false,
        "assignee": null,
        "assignees": [

        ],
        "milestone": null,
        "comments": 6,
        "created_at": "2021-05-31T14:55:47Z",
        "updated_at": "2021-07-10T22:32:06Z",
        "closed_at": "2021-07-10T22:32:06Z",
        "author_association": "NONE",
        "active_lock_reason": null,
        "body": "<!--\r\nIf possible fill each section\r\n-->\r\n\r\n# Bug report\r\nSeach box space not working properly\r\n<!--\r\nVerify this steps before writing a new issue:\r\n\r\n - Search for existing issues; it's possible someone has already encountered this bug.\r\n-->\r\n\r\n## OS information\r\nWindows 10\r\n\r\n<!--\r\nWhat operating system and browser version are you using?\r\n-->\r\n\r\n## Steps to reproduce\r\n- Click on the devdoc search box\r\n- Type a text\r\n- Tap on your spacebar key (To give a space)\r\n- Type another text\r\nYou'll realize that it does not give space at all. Instead, it just scrolls the page down.\r\n\r\n<!--\r\nWrite the steps to reproduce this bug or write a description about when and how you\r\nencountered it\r\n-->\r\n\r\n## More resources\r\n![nospace](https://user-images.githubusercontent.com/63640577/120210044-401baa00-c227-11eb-86d1-1b42833cdae0.png)\r\nI was literally tapping the spacebar but it keeps scrolling down the current document that was opened.\r\n<!--\r\nAdd images, GIFs, screenshot, console output, or any other resource that might help to understand this bug\r\n-->\r\n\r\n## Possible fix\r\n- Add an autocomplete feature, maybe.\r\n\r\n> Although I discovered a hackaround last week 20th May 2021.\r\nWhat I do was to just tap on my esc key then Voilà, I would be able to give space in the search box again.\r\nBut last night 30th May 2021.\r\nIf I should just tap on the esc key it just clears the entire text 😞 \r\n\r\n<!--\r\nIf you have an idea how to fix this you can write here\r\n-->\r\n",
        "performed_via_github_app": null
      }
    },
    "public": true,
    "created_at": "2021-07-10T22:32:06Z",
    "org": {
      "id": 9892522,
      "login": "freeCodeCamp",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/freeCodeCamp",
      "avatar_url": "https://avatars.githubusercontent.com/u/9892522?"
    }
  }));

  setInterval(refreshEvents, 60000);

});

async function refreshEvents() {
  const repos = await dbApi.getRepoList();


  repos.forEach((repo) => {
    eventHandler.getNewEvents(repo);
  });
}

// refreshEvents();

client.login(token);
