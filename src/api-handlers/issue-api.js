const fetch = require("node-fetch");

function issueApi() {
  let openIssues, closedIssues;
  fetch("https://api.github.com/repos/Gruntfuggly/todo-tree/issues?state=open")
    .then((res) => res.json())
    .then((json) => {
      openIssues = json[0].number;
      console.log(openIssues);
    });
  fetch(
    "https://api.github.com/repos/Gruntfuggly/todo-tree/issues?state=closed"
  )
    .then((res) => res.json())
    .then((json) => {
      closedIssues = json[0].number;
      console.log(closedIssues);
    });
}
module.exports = { issueApi };

issueApi();
