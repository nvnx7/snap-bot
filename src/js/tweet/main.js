let btn;
let themeControl;
let likeControl;
let imageControl;
let tweetWrapper;
let hideImageHandler;

document.addEventListener("DOMContentLoaded", () => {
  // embedTweet("1262859072459726849");
  btn = document.getElementById("download-btn");
  themeControl = document.getElementById("theme-control");
  likeControl = document.getElementById("like-control");
  imageControl = document.getElementById("image-control");
  tweetWrapper = document.getElementById("tweet-wrapper");

  const tweetId = window.location.pathname.split("/").pop();
  let tweet;
  if (sessionStorage.getItem(tweetId)) {
    try {
      tweet = JSON.parse(sessionStorage.getItem(tweetId));
    } catch (err) {
      console.log("Error parsing tweet!");
      sessionStorage.removeItem(tweetId);
      alert("Error ocurred while parsing the tweet!");
    }
  } else {
    fetchTweet(tweetId, (tweetData) => {
      console.log(`TweetData:${tweetData}`);
      tweet = tweetData;
    });
  }

  btn.addEventListener("click", () => {
    takeShot();
  });

  themeControl.addEventListener("click", () => {
    const theme = themeControl.querySelector(`input[name="theme"]:checked`)
      .value;
    setTheme(theme);
  });

  likeControl.addEventListener("click", () => {
    const checked = likeControl.querySelector(`input[name="like"]`).checked;
    setTweetLiked(checked);
  });

  hideImageHandler = () => {
    const checked = imageControl.querySelector(`input[name="image"]`).checked;
    setHideTweetImage(checked);
  };

  imageControl.addEventListener("click", hideImageHandler);
  // console.log(`TExT: ${tweet}`);

  setTweet(tweet);
});
