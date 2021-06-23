const fetch = require("node-fetch");

async function getNewEvents(repoURL, { lastIssueTimeStamp }) {
  let res;
  let resJson;
  let issueEvents = [];
  let i = 1;

  do {
    let pUrl = pageUrl(repoURL, i);

    res = await fetch(pUrl);
    resJson = await res.json();

    issueEvents = issueEvents.concat(
      resJson.filter(
        (event) =>
          event.type === "IssuesEvent" && event.created_at >= lastIssueTimeStamp
      )
    );

    i++;
  } while (issueEvents[issueEvents.length - 1] < lastIssueTimeStamp);

  console.log(issueEvents.length);
  console.log(issueEvents[issueEvents.length - 1]);
}
// getNewEvents(
//   "https://api.github.com/repos/SanpuiRonak/disgit/events?per_page=100",
//   { lastIssueTimeStamp: "2021-05-08T18:10:52Z" }
// );

getNewEvents("https://api.github.com/repos/freeCodeCamp/devdocs", {
  lastIssueTimeStamp: "2021-05-08T18:10:53Z",
});

function pageUrl(repoURL, pageNo) {
  return repoURL + `/events?per_page=100&page=${pageNo}`;
}
module.exports = { getNewEvents };
