const fetch = require("node-fetch");

async function getNewEvents(repoURL, { lastIssueTimeStamp }) {
  let res;
  let resJson;
  let issueEvents = [];
  let i = 1;

  do {
    res = await fetch(pageUrl(repoURL, i));
    resJson = await res.json();
    // console.log(resJson);

    issueEvents = issueEvents.concat(
      resJson.filter(
        (event) =>
          event.type === "IssuesEvent" && event.created_at >= lastIssueTimeStamp
      )
    );

    i++;
  } while (false);

  console.log(issueEvents);
}
getNewEvents(
  "https://api.github.com/repos/SanpuiRonak/disgit/events?per_page=100",
  { lastIssueTimeStamp: "2021-05-08T18:10:52Z" }
);

function pageUrl(repoURL, pageNo) {
  return repoURL + `/events/?per_page=100&page=${pageNo}`;
}
module.exports = { getNewEvents };
