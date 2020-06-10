const config = require("../model/config.js");
const Twitter = require("twitter-lite");

const client = new Twitter(config);

const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8080"
    : "https://tweetsnapbot.herokuapp.com";
const username = "@snap_twt";

const salutaions = [
  "See you again! 👋",
  "Have a good one! ✌️",
  "Cheers! 🍻",
  "Share it if it's interesting! 🙏",
];

function startTrackingMentions() {
  const stream = client.stream("statuses/filter", {
    track: `${username} snap`,
    tweet_mode: "extended",
  });

  stream.on("data", (tweet) => {
    // Auto reply if mentioned with keyword
    console.log(`Mentioned in tweet: ${tweet.id_str}`);

    generateReply(tweet);
  });

  stream.on("error", (err) => {
    console.log(`Stream error: ${err}`);
  });
}

function requestTweet(tweetId, callback) {
  client
    .get("statuses/show", { id: tweetId, tweet_mode: "extended" })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      console.log(`\nRequest tweet err\n${JSON.stringify(err)}`);
      callback(err);
    });
}

function generateReply(tweet) {
  const statusId = tweet.id_str;
  const inReplyToStatusId = tweet.in_reply_to_status_id_str;
  const username = tweet.user.screen_name;
  let replyText;

  if (inReplyToStatusId)
    replyText = `Hello @${username}!\nGet your snapshot right here 👉 ${baseUrl}/${inReplyToStatusId}\n${getRandomSalutation()}`;
  else
    replyText = `@${username} Well... that doesn't look like a reply to a thread 🙄.\nCheck me out at @snap_twt to know how to use me 😀.`;

  client
    .post("statuses/update", {
      status: replyText,
      in_reply_to_status_id: statusId,
    })
    .then((tweet) => {
      console.log(`Successfully replied with tweet id ${tweet.id}`);
    })
    .catch((err) => {
      console.log(`Error replying to a request: ${JSON.stringify(err)}`);
    });
}

function extractTweet(data) {
  const tweet = {};
  tweet.id = data.id_str;
  tweet.author = data.user.name;
  tweet.username = data.user.screen_name;
  tweet.profilePic = data.user.profile_image_url_https;
  tweet.verified = data.user.verified;
  tweet.tweetText = data.full_text;
  tweet.likeCount = data.favorite_count;
  tweet.createdAt = data.created_at; // UTC Time

  if (data.extended_entities) {
    // Remove any media url text
    const idx = data.extended_entities.media[0].indices[0];
    tweet.tweetText = tweet.tweetText.slice(0, idx).trim();
    if (data.extended_entities.media[0].type === "photo")
      tweet.media = data.extended_entities.media[0].media_url_https;
  }

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

function getRandomSalutation() {
  return salutaions[Math.floor(Math.random() * salutaions.length)];
}

module.exports = { requestTweet, extractTweet, startTrackingMentions };
