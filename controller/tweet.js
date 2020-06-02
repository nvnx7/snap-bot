const config = require("../model/config.js");
const Twit = require("twit");

const T = new Twit(config);

const username = "@snap_twt";

function startTrackingMentions() {
  const stream = T.stream("statuses/filter", { track: `${username} snap` });
  stream.on("tweet", (tweet) => {
    console.log(`Tweet mention detected: ${JSON.stringify(tweet)}`);
    generateReply(tweet);
  });
}

function requestTweet(tweetId, callback) {
  T.get("statuses/show/:id", { id: tweetId }, callback);
}

function generateReply(tweet) {
  const statusId = tweet.id_str;
  const inReplyToStatusId = tweet.in_reply_to_status_id_str;
  const inReplyToUsername = tweet.in_reply_to_screen_name;
  const replyText = `@${inReplyToUsername} Go to http://localhost:8080/tweet/${inReplyToStatusId}`;

  T.post(
    "statuses/update",
    { status: replyText, in_reply_to_status_id: statusId },
    (err, reply) => {
      if (err) console.log(`Error replying to request: ${err}`);
      else console.log(`Successfully replied: ${JSON.stringify(reply)}`);
    }
  );
}

function extractTweet(data) {
  console.log(`\n Original tweet: ${JSON.stringify(data)}\n`);

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

  const hashtags = data.entities.hashtags.map((hashtag) => {
    return `#${hashtag.text}`;
  });

  const mentions = data.entities.user_mentions.map((mention) => {
    return `@${mention.screen_name}`;
  });

  const symbols = data.entities.symbols.map((symbol) => {
    return `$${symbol.text}`;
  });

  const urls = data.entities.urls.map((url) => {
    return url.url;
  });

  tweet.tokens = [...hashtags, ...mentions, ...symbols, ...urls];

  return tweet;
}

module.exports = { requestTweet, extractTweet, startTrackingMentions };
