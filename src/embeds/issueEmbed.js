const Discord = require("discord.js");

function getEmbed(issueObj) {
  let body;
  if (issueObj.payload.issue.body.length > 100) {
    body = issueObj.payload.issue.body.substring(0, 100) + "...";
  }
  else {
    body = issueObj.payload.issue.body;
  }
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#FFFF00")
    .setTitle(issueObj.payload.issue.title)
    .setURL(issueObj.payload.issue.html_url)
    .setAuthor(
      issueObj.repo.name,
      "",
      "https://github.com/" + issueObj.repo.name
    )
    .setDescription(body)
    // .setThumbnail("https://opengraph.githubassets.com/13e8e9da3d59baf06e01f5937109ed0b447faec0e5f6158735719cd50099ccbf/freeCodeCamp/devdocs")
    .setThumbnail(issueObj.payload.issue.user.avatar_url)
    .setTimestamp()
    .setFooter(issueObj.actor.display_login, issueObj.payload.issue.user.avatar_url);
  return exampleEmbed;
}

module.exports = { getEmbed };
