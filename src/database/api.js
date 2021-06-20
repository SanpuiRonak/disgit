const { Repo, deb } = require("./db");

async function newRepo({ guildId, repoURL, channelId }) {
  let secondLastIndex = repoURL.lastIndexOf("/", repoURL.lastIndexOf("/") - 1);

  let repoName = repoURL.substr(secondLastIndex + 1);

  const guild = await newGuild({ guildId, channelId });
  const repo = new Repo({
    repoName: repoName,
    repoURL: repoURL,
    guilds: [guild],
  });

  await repo.save();
  return repo;
}

async function newGuild({ guildId, channelId }) {
  const guild = {
    guildID: guildId,
    issueChannelID: channelId,
    PRChannelID: channelId,
  };
  return guild;
}

async function addGuild({ guildId, repoURL, channelId }) {
  let repo = await Repo.findOne({ repoURL: repoURL });

  if (!repo) {
    //create a new repo
    newRepo({ guildId, repoURL, channelId });
  } else {
    if (
      repo.guilds.find((guild) => {
        guildID == guild.guildId;
      })
    ) {
      throw new Error("Repo already exists");
    }
    const guild = await newGuild({ guildId, channelId });

    await Repo.updateOne({ repoURL: repoURL }, { $push: { guilds: guild } });
  }
}

async function getRepo(repoURL) {
  let res = await Guild.findOne({ repoURL: repoURL });

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

module.exports = { addGuild, getRepo, removeRepo, getIssueChannel };
