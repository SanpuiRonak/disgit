const issue = require("../embeds/issueEmbed");

module.exports = {
  name: "issue",
  description: "Ping!",
  execute() {
    let iobj = {
      title: "Feature : TODO/FIXME snippet",
      html_url: "https://github.com/Gruntfuggly/todo-tree/issues/501",
      user: {
        login: "jawa0919",
        url: "https://github.com/jawa0919",
        avatar_url: "https://avatars.githubusercontent.com/u/18129670?v=4",
      },
    };
    issue.sendIssueNotify(iobj);
  },
};
