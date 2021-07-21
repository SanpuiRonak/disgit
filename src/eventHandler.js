const deb = require("debug")("eventHandler.js: ");
const fetch = require("node-fetch");




async function getNewEvents(repo) {
  let res;
  let resJson;

  let eventsArray = [];

  deb(repo.repoName);

  let minStamp = repo.lastTimeStamp;
  deb("latest Stamp: ", minStamp);
  let i = 1;

  do {
    let pUrl = pageUrl(repo.repoURL, i);
    deb("pUrl:" + pUrl);
    res = await fetch(pUrl);

    resJson = await res.json();

    eventsArray = eventsArray.concat(
      resJson.filter((event) => Date.parse(event.created_at) > minStamp)
    );
    i++;
    deb("eventArray length: " + eventsArray.length);
  } while (
    eventsArray.length > 0 &&
    minStamp < Date.parse(resJson[resJson.length - 1].created_at)
  );

  let openIssueEvents = eventsArray.filter(
    (event) => event.type === "IssuesEvent" && event.payload.action === "opened"
  );

  let closeIssueEvents = eventsArray.filter(
    (event) => event.type === "IssuesEvent" && event.payload.action === "closed"
  );
  // console.log(openIssueEvents.length);

  let lastestStamp;
  if (eventsArray.length > 0) {
    lastestStamp = Date.parse(eventsArray[0].created_at);
  }
  else {
    lastestStamp = null;
  }
  console.log(eventsArray);

  return { openIssueEvents, closeIssueEvents, lastestStamp };

}


// getNewEvents({
//   _id: { $oid: "60df33fb899b2a1861cc4d66" },
//   lastTimeStamp: Date.parse("2021-05-08T18:10:52Z"),
//   repoName: "SanpuiRonak/tictactoe-react",
//   repoURL: "https://api.github.com/repos/SanpuiRonak/disgit",
//   guilds: [
//     {
//       _id: { $oid: "60df33fb899b2a1861cc4d67" },
//       guildID: "760152955608891433",
//       issueChannelID: "760152956069740596",
//       PRChannelID: "760152956069740596",
//     },
//   ],
//   __v: 0,
// });


function pageUrl(repoURL, pageNo) {
  return repoURL + `/events?per_page=100&page=${pageNo}`;
}
module.exports = { getNewEvents };
