let downloadBtn;
let themeControl;
let likeControl;
let imageControl;
let tweetWrapper;
let hideImageHandler;
let loadingIndicator;
let errorMessage;
let tweetId;

document.addEventListener("DOMContentLoaded", () => {
  downloadBtn = document.getElementById("download-btn");
  themeControl = document.getElementById("theme-control");
  likeControl = document.getElementById("like-control");
  imageControl = document.getElementById("image-control");
  tweetWrapper = document.getElementById("tweet-wrapper");
  loadingIndicator = createLoadingIndicator();
  errorMessage = createErrorMessage();

  setEnableControls(false);
  setTweetLoading(true);
  tweetId = window.location.pathname.split("/").pop();

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
      // Cache in session storage
      window.sessionStorage.setItem(tweetData.id, JSON.stringify(tweetData));
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
});
