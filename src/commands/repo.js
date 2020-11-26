function execute(msg, args) {
  if (args.length == 0) {
    msg.reply("Will list current repo");
  }
  switch (args[0]) {
    case "track":
      if (args.length <= 1) {
        msg.reply("Link Pliz 😶");
        break;
      }
      if (validate(args[1]) === false) {
        msg.reply(" the link seems to be broken💔");
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

module.exports = {
  name: "repo",
  description: "Repo Handling Commands",
  execute,
};
