const fetch = require("node-fetch");

const deb = require("debug")("Repo Debug");

function execute(msg, args) {
  if (args.length == 0) {
    msg.reply("Will list current repo");
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
      let res = apiValdate(api);
      console.log(res);

      if (apiValdate(api) === false) {
        msg.reply(" the link seems to be broken💔");
        // break;
      } else {
        msg.reply("Adding");
      }
      break;
    case "remove":
      if (args.length <= 1) {
        msg.reply("Link Pliz 😶");
        break;
      }

      msg.reply("Remove Link");
      break;

    default:
      break;
  }
}

function validate(link) {
  let linkValidater = new RegExp("^https?://github.com/.+/.+$");
  return linkValidater.test(link);
}

function apiValdate(api) {
  // deb(api);
  fetch(api)
    .then((res) => res.status)
    .then((status) => {
      deb(status);
      if (status === 200) return true;
      else return false;
    });
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
