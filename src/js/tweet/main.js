let downloadBtn;
let themeControl;
let likeControl;
let imageControl;
let tweetWrapper;
let hideImageHandler;
let loadingIndicator;
let errorMessage;

document.addEventListener("DOMContentLoaded", () => {
  // embedTweet("1262859072459726849");
  downloadBtn = document.getElementById("download-btn");
  themeControl = document.getElementById("theme-control");
  likeControl = document.getElementById("like-control");
  imageControl = document.getElementById("image-control");
  tweetWrapper = document.getElementById("tweet-wrapper");
  loadingIndicator = createLoadingIndicator();
  errorMessage = createErrorMessage();

  setEnableControls(false);
  setTweetLoading(true);
  const tweetId = window.location.pathname.split("/").pop();

  if (sessionStorage.getItem(tweetId)) {
    try {
      const tweet = JSON.parse(sessionStorage.getItem(tweetId));
      setEnableControls(true);
      setTweet(tweet);
    } catch (err) {
      console.log("Error parsing tweet!");
      sessionStorage.removeItem(tweetId);
      alert("Error ocurred while parsing the tweet. Try refreshing page.");
    } finally {
      setTweetLoading(false);
    }
  } else {
    console.log(`Tweet not found in local storage. Fetching...`);
    fetchTweet(tweetId, (tweetData) => {
      // console.log(`TweetData:${tweetData}`);
      // tweet = tweetData;
      setEnableControls(true);
      setTweet(tweetData);
      setTweetLoading(false);
    });
  }

  downloadBtn.addEventListener("click", () => {
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

  // setTweet(tweet);
});
