const { Guild, deb } = require("./db");

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

async function addRepo({ guildId, repoURL, channelId }) {
  let res = await Guild.findOne({ guildId: guildId });

  if (!res) {
    newGuild({ guildId, repoURL, channelId });
  } else {
    deb("Throwed error");

    throw new Error("Repo exsist");
  }
}

async function getRepo(guildId) {
  let res = await Guild.findOne({ guildId: guildId });

  if (!res) {
    return new Error("Repo doesn't exsist");
  } else {
    return res;
  }
}

async function removeRepo({ guildId }) {
  deb("Remove repo begining");
  let res = await Guild.findOne({ guildId: guildId });
  if (!res) {
    deb("Remove repo if");
    return new Error("Repo doesn't exsist");
  } else {
    await Guild.findOneAndDelete(guildId);
    deb("Removed");
  }
}

module.exports = { addRepo, getRepo, removeRepo };
