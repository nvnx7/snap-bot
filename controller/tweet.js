const config = require("../model/config.js");
const Twit = require("twit");

const T = new Twit(config);

const username = "@snap_twt";

function startTrackingMentions() {
  const stream = T.stream("statuses/filter", { track: `${username} snap` });
  stream.on("tweet", (tweet) => {
    console.log(`Tweet mention detected: ${JSON.stringify(tweet)}`);
  });
}

function requestTweet(tweetId, callback) {
  T.get("statuses/show/:id", { id: tweetId }, callback);
}

function extractTweet(data) {
  const tweet = {};
  tweet.id = data.id_str;
  tweet.author = data.user.name;
  tweet.username = data.user.screen_name;
  tweet.profilePic = data.user.profile_image_url;
  tweet.verified = data.user.verified;
  tweet.tweetText = data.text;
  tweet.likeCount = data.favorite_count;
  tweet.createdAt = data.created_at; // UTC Time
  tweet.media = data.entities.media;
  tweet.tokens = [
    ...data.entities.hashtags,
    ...data.entities.user_mentions,
    ...data.entities.symbols,
    ...data.entities.urls,
  ];

  return tweet;
}

module.exports = { requestTweet, extractTweet, startTrackingMentions };
