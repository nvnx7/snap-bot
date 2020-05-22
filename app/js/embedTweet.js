const options = {
  conversations: "all",
  cards: "visible",
  width: "auto",
  align: "left",
  theme: "dark",
};

const shotOptions = {
  allowTaint: true,
  logging: true,
};

function embedTweet(id) {
  twttr.widgets.createTweet(id, document.getElementById("target"), options);
}

function takeShot() {
  html2canvas(document.getElementById("tweet-wrapper"), shotOptions).then(
    (canvas) => {
      document.body.appendChild(canvas);
    }
  );
}
