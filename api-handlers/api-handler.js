const fetch = require("node-fetch");

async function getNewEvents(repoURL, { lastIssueTimeStamp }) {
  let res = await fetch(repoURL);
  let resJson = await res.json();

  let issueEvents = resJson.filter(
    (event) =>
      event.type === "IssuesEvent" && event.created_at >= lastIssueTimeStamp
  );
}
getNewEvents(
  "https://api.github.com/repos/SanpuiRonak/disgit/events?per_page=100",
  { lastIssueTimeStamp: "2021-05-08T18:10:52Z" }
);
module.exports = { getNewEvents };
