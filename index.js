const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const Twit = require("twit");

const typeMap = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
};

const baseDir = "./dist";

function handleRequests(req, res) {
  console.log(`${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url);
  let filePath = baseDir + parsedUrl.pathname;
  if (filePath == `${baseDir}/`) filePath = `${baseDir}/index.html`;

  const extname = path.extname(filePath);
  const contentType = typeMap[extname];

  fs.exists(filePath, (exist) => {
    if (!exist) {
      res.statusCode = 404;
      res.end(`File ${fileName} not found!`);
      return;
    }

    fs.readFile(filePath, function (err, data) {
      if (err) {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting file: ${err}.`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  });
}

http.createServer(handleRequests).listen(8080);

console.log("Server started");
