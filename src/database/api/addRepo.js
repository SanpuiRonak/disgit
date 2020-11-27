const { Guild, deb } = require("../db");

async function addRepo({ guildId, repoURL, channelId }) {
  let res = await Guild.findOne({ guildId: guildId });
  //   deb(res);
  if (!res) {
    newGuild({ guildId, repoURL, channelId });
  } else {
    return new Error("Repo exsists");
  }
}

async function newGuild({ guildId, repoURL, channelId }) {
  //Scaffholding vaules
  let repoName = "Lorem";
  const guild = new Guild({
    guildId: guildId,
    repo: {
      repoName: repoName,
      repoURL: repoURL,
      commit: {
        channelId: channelId,
        commitCount: 0,
      },
    },
  });
  await guild.save();
}

module.exports = { addRepo };
