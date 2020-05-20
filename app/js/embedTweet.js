const options = {
  conversations: "all",
  cards: "visible",
  width: "auto",
  align: "left",
  theme: "dark",
};

function embedTweet(id) {
  twttr.widgets.createTweet(id, document.getElementById("target"), options);
}

export { embedTweet };
