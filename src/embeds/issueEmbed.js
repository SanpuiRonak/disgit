const Discord = require("discord.js");

const { sendEmbed } = require("../main");
const { hello } = require("../sosta");
function sendIssueNotify(issueObj) {
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#3d803d")
    .setTitle(`${issueObj.title}`) // COMMIT MESSAGE
    .setURL(`${issueObj.html_url}`) // URL OF COMMIT
    .setAuthor(
      `New issue! 🏳️‍🌈\n By ${issueObj.user.login} `,
      `${issueObj.user.avatar_url}`,
      `${issueObj.user.html_url}`
    )
    .setThumbnail(`${issueObj.user.avatar_url}`); // avatar url
  // .addFields(
  //   { name: "\u200B", value: "\u200B" },
  //   {
  //     name: `\nCommited By : ${issueObj.commit.author.name}`,
  //     // value: `Commit Hash: ${args.sha}`,
  //   },
  //   {
  //     name: `📅  ${args.commit.author.date.substr(0, 10)}`,
  //     value: `⌚ ${args.commit.author.date.slice(11, 19)}`,
  //   }
  // );
  // sendEmbed(exampleEmbed);
  hello();
}

module.exports = { sendIssueNotify };
