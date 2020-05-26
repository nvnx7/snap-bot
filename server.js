const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const typeMap = require("./model/constants.js");
const requestTweet = require("./controller/tweet.js");

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
// const baseDir = "./dist";
app.use("/public", express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/:id", (req, res) => {
  if (!reg.test(req.params.id)) {
    res.status(404).type("text").send(`Invalid tweet id: ${req.params.id}`);
  }

  res.sendFile(`${__dirname}/views/tweet.html`);
});

const listener = app.listen(8080, () => {
  console.log(`Server started at ${listener.address().port}`);
});

// function handleRequests(req, res) {
//   console.log(`${req.method} ${req.url}`);

//   const pathname = url.parse(req.url).pathname;
//   if (reg.test(pathname.slice(1))) {
//     requestTweet(pathname.slice(1));
//     console.log(`API Call received ${pathname}`);
//     res.writeHead(200, { "Content-Type": typeMap[".json"] });
//     res.end(JSON.stringify(sample));
//     return;
//   }

//   let filePath = baseDir + pathname;
//   if (filePath == `${baseDir}/`) filePath = `${baseDir}/index.html`;

//   const extname = path.extname(filePath);
//   const contentType = typeMap[extname];

//   fs.exists(filePath, (exist) => {
//     if (!exist) {
//       res.statusCode = 404;
//       res.end(`File ${filePath} not found!`);
//       return;
//     }

//     fs.readFile(filePath, function (err, data) {
//       if (err) {
//         if (err) {
//           res.statusCode = 500;
//           res.end(`Error getting file: ${err}.`);
//         }
//       } else {
//         res.writeHead(200, { "Content-Type": contentType });
//         res.end(data);
//       }
//     });
//   });
// }

// http.createServer(handleRequests).listen(8080);

// console.log("Server started");
