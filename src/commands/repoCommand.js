const fetch = require("node-fetch");
const deb = require("debug")("Repo Debug");
const databaseApi = require("../database/api");

async function execute(msg, args) {
  if (args.length == 0) {
    try {
      let res = await databaseApi.getRepo(msg.guild.id);

      msg.reply(`Trackin ${res.repo.repoName}`);
    } catch (err) {
      deb(err);
      msg.reply(`Currently not tracking any repo`);
    }
  }
  switch (args[0]) {
    case "track":
      if (args.length <= 1) {
        msg.reply("Link Pliz 😶");
        break;
      } else if (validate(args[1]) === false) {
        msg.reply(" the link seems to be broken💔");
        deb(args[1]);
        break;
      }
      const api = generateApi(args[1]);
      let res = await apiValdate(api);
      console.log(res);

      if (res === false) {
        msg.reply(" the link seems to be broken💔");
      } else {
        let hadExcpetion = false;
        try {
          await databaseApi.addRepo({
            guildId: msg.guild.id,
            repoURL: api,
            channelId: msg.channel.id,
          });
        } catch (error) {
          deb(error);
          msg.reply(" A repo is being tracked already");
          hadExcpetion = true;
        }
        if (!hadExcpetion) {
          msg.reply(" Repo Added");
        }
      }
      break;

    case "remove":
      let hadExcpetion = false;
      try {
        await databaseApi.removeRepo({
          guildId: msg.guild.id,
        });
      } catch (err) {
        msg.reply("You are not tracking any repo!");
        deb(err);
        hadExcpetion = true;
      }
      if (!hadExcpetion) {
        msg.reply(`Removed repo`);
      }
      break;
  }
}

function validate(link) {
  let linkValidater = new RegExp("^https?://github.com/.+/.+$");
  return linkValidater.test(link);
}

async function apiValdate(api) {
  deb(api);
  let result = await fetch(api);
  if (result.status === 200) {
    return true;
  } else {
    return false;
  }
}

function generateApi(link) {
  let api = "https://api.github.com/repos";
  let secondLastIndex = link.lastIndexOf("/", link.lastIndexOf("/") - 1);
  api += link.substr(secondLastIndex);
  return api;
}

module.exports = {
  name: "repo",
  description: "Repo Handling Commands",
  execute,
};
