const Twit = require("twit");

const appUserName = "@snapbot";

const T = new Twit({
  consumer_key: "",
  consumer_secret: "",
  access_token: "",
  access_token_secret: "",
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

const stream = T.stream("statuses/filter", { track: appUserName });

stream.on("tweet", event);
