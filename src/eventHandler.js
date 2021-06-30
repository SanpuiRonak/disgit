const deb = require("debug")("eventHandler.js");
const fetch = require("node-fetch");

async function getNewEvents(repoURL, { lastIssueTimeStamp, lastPRTimeStamp }) {
  let res;
  let resJson;

  let eventsArray = [];

  let latestStamp = Math.min([lastIssueTimeStamp]);
  console.log(latestStamp);
  let i = 1;

  do {
    let pUrl = pageUrl(repoURL, i);
    console.log("pUrl:" + pUrl);
    res = await fetch(pUrl);

    resJson = await res.json();
    // console.log(resJson);
    eventsArray = eventsArray.concat(
      resJson.filter((event) => Date.parse(event.created_at) > latestStamp)
    );
    i++;
    console.log(eventsArray.length);
    console.log(eventsArray[eventsArray.length - 1].created_at);
  } while (
    eventsArray.length > 0 &&
    latestStamp < Date.parse(resJson[resJson.length - 1].created_at)
  );

  // issueEvents = issueEvents.concat(
  //   resJson.filter(
  //     (event) =>
  //       event.type === "IssuesEvent" && event.created_at > lastIssueTimeStamp
  //   )
  // );

  console.log(eventsArray.length);
  console.log(eventsArray[eventsArray.length - 1].created_at);

  return {};
}

getNewEvents("https://api.github.com/repos/freeCodeCamp/devdocs", {
  lastIssueTimeStamp: Date.parse("2021-06-20T15:26:08Z"),
});

function pageUrl(repoURL, pageNo) {
  return repoURL + `/events?per_page=100&page=${pageNo}`;
}
module.exports = { getNewEvents };
