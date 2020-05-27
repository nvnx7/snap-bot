const config = require("../model/config.js");
const Twit = require("twit");

const T = new Twit(config);

function requestTweet(tweetId, callback) {
  T.get("statuses/show/:id", { id: tweetId }, callback);
}

module.exports = requestTweet;
