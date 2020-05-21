const options = {
  conversations: "all",
  cards: "visible",
  width: "auto",
  align: "left",
  theme: "dark",
};

shotOptions = {
  allowTaint: true,
  logging: true,
  width: 100,
  height: 50,
};

function embedTweet(id) {
  twttr.widgets.createTweet(id, document.getElementById("target"), options);
}

function takeShot() {
  html2canvas(document.getElementById("tweet-container"), shotOptions).then(
    (canvas) => {
      document.body.appendChild(canvas);
    }
  );
}
