const deb = require("debug")("eventHandler.js");
const fetch = require("node-fetch");

async function getNewEvents(repoURL, { lastIssueTimeStamp, lastPRTimeStamp }) {
  let res;
  let resJson;
  let issueEvents = [];
  let PREvents = [];
  let i = 1;
  let loopCondition;
  do {
    let pUrl = pageUrl(repoURL, i);

    res = await fetch(pUrl);
    resJson = await res.json();

    issueEvents = issueEvents.concat(
      resJson.filter(
        (event) =>
          event.type === "IssuesEvent" && event.created_at > lastIssueTimeStamp
      )
    );

    deb("pUrl:" + pUrl);
    deb(issueEvents.length);
    // console.log(issueEvents[issueEvents.length - 1].created_at);
    loopCondition =
      resJson.filter(
        (event) =>
          event.type === "IssuesEvent" && event.created_at <= lastIssueTimeStamp
      ).length <= 0;

    i++;
    deb(loopCondition);
  } while (loopCondition);

  console.log(issueEvents.length);

  return { issueEvents };
}

// getNewEvents("https://api.github.com/repos/freeCodeCamp/devdocs", {
//   lastIssueTimeStamp: "2021-06-09T05:51:20Z",
// });

function pageUrl(repoURL, pageNo) {
  return repoURL + `/events?per_page=100&page=${pageNo}`;
}
module.exports = { getNewEvents };
