const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");
const dotenv = require("dotenv");
const favicon = require("serve-favicon");

dotenv.config();

const {
  requestTweet,
  extractTweet,
  startTrackingMentions,
} = require("./controller/tweet.js");

const app = express();

const reg = /^\d+$/;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/view/index.html`);
});

app.post("/tweet", (req, res) => {
  const tweetId = url.parse(req.body.tweetUrl).pathname.split("/").slice(-1)[0];
  if (!reg.test(tweetId))
    res.status(404).type("text").send(`Invalid tweet id: ${tweetId}`);

  requestTweet(tweetId, (err, data, response) => {
    if (err) {
      res.statusMessage = err.message;
      res.status(404).end();
    } else {
      const tweetData = extractTweet(data);
      res.status(200).json(tweetData);
    }
  });
});

app.get("/tweet/:id", (req, res) => {
  if (!reg.test(req.params.id)) {
    res.status(404).type("text").send(`Invalid tweet id: ${req.params.id}`);
  }

  res.sendFile(`${__dirname}/view/tweet.html`);
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Server started at ${listener.address().port}`);
  startTrackingMentions();
  console.log("Listening for mentions...");
});
