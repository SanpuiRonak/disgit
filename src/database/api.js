const { Guild, deb } = require("./db");

async function newGuild({ guildId, repoURL, channelId }) {
  //Scaffholding vaules
  let secondLastIndex = repoURL.lastIndexOf("/", repoURL.lastIndexOf("/") - 1);

  let repoName = repoURL.substr(secondLastIndex + 1);

  const guild = new Guild({
    guildId: guildId,
    repoCount: 1,
    repo: {
      repoName: repoName,
      repoURL: repoURL,
      issueChannel: channelId,
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
    throw new Error("Repo doesn't exsist");
  } else {
    return res;
  }
}

async function removeRepo({ guildId }) {
  deb("Remove repo begining");
  let res = await Guild.findOne({ guildId: guildId });
  if (!res) {
    deb("Remove repo if");
    throw new Error("Repo doesn't exsist");
  } else {
    await Guild.findOneAndDelete(guildId);
    deb("Removed");
  }
}

async function getIssueChannel({ guildId }) {
  let res = await Guild.findOne({ guildId: guildId });
  if (!res) {
    throw new Error("Repo doesn't exsist");
  } else {
    const guild = await Guild.findOneAndDelete(guildId);
    return guild.issue.issueChanel;
  }
}

module.exports = { addRepo, getRepo, removeRepo, getIssueChannel };
