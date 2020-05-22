const options = {
  conversations: "all",
  cards: "visible",
  width: "auto",
  align: "left",
  theme: "dark",
};

const shotOptions = {
  allowTaint: false,
  logging: true,
};

function embedTweet(id) {
  twttr.widgets.createTweet(id, document.getElementById("target"), options);
}

function downloadImage(uri, filename = "tweet.png") {
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

function takeShot() {
  html2canvas(document.getElementById("tweet-wrapper"), shotOptions).then(
    (canvas) => {
      // document.body.appendChild(canvas);
      downloadImage(canvas.toDataURL());
    }
  );
}
