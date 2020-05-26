const config = require("../model/config.js");
const Twit = require("twit");

const T = new Twit(config);

function requestTweet(tweetId) {
  T.get("statuses/show/:id", { id: tweetId }, (err, data, response) => {
    console.log(`Tweet Data: ${JSON.stringify(data)}`);
  });
}

module.exports = requestTweet;
