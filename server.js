const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");
const dotenv = require("dotenv");

dotenv.config();

const typeMap = require("./model/constants.js");
const {
  requestTweet,
  extractTweet,
  startTrackingMentions,
} = require("./controller/tweet.js");

const app = express();

const sample = {
  author: "Wisdom Theory",
  username: "wealth_theory",
  verified: false,
  profilePic:
    "https://pbs.twimg.com/profile_images/1242963480707248128/ZCzQHDaw_normal.jpg",
  tweetText: `Everyone you meet is fighting a #battle you know nothing about.<br /><br />Be #kind.<br /><br />Always. @random`,
  tweetImage: "",
  likeCount: 234,
  timeString: "3:04 AM - May 20, 2020",
  tokens: ["#battle", "#kind", "@random"],
};

const sample2 = {
  author: "Wisdom Theory",
  username: "wealth_theory",
  verified: false,
};

const reg = /^\d+$/;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/view/index.html`);
});

app.post("/tweet", (req, res) => {
  // console.log(`Req Body at server: ${JSON.stringify(req.body)}`);
  const tweetId = url.parse(req.body.tweetUrl).pathname.split("/").slice(-1)[0];
  // console.log(`Id: ${tweetId}`);
  if (!reg.test(tweetId))
    res.status(404).type("text").send(`Invalid tweet id: ${tweetId}`);

  requestTweet(tweetId, (err, data, response) => {
    // console.log(`Err: ${JSON.stringify(err)}`);
    // console.log(`Data: ${JSON.stringify(data)}`);
    // console.log(`Response: ${JSON.stringify(response)}`);

    if (err) {
      res.statusMessage = err.message;
      res.status(404).end();
    } else {
      const tweetData = extractTweet(data);
      console.log(`Tweet Data: ${JSON.stringify(tweetData)}`);
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

const listener = app.listen(8080, () => {
  console.log(`Server started at ${listener.address().port}`);
  startTrackingMentions();
  console.log("Listening for mentions...");
});
