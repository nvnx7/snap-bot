// embedTweet("1262859072459726849");
const btn = document.getElementById("download-btn");
const themeControl = document.getElementById("theme-control");
const likeControl = document.getElementById("like-control");
const imageControl = document.getElementById("image-control");

btn.addEventListener("click", () => {
  takeShot();
});

themeControl.addEventListener("click", () => {
  const theme = themeControl.querySelector(`input[name="theme"]:checked`).value;
  setTheme(theme);
});

likeControl.addEventListener("click", () => {
  const checked = likeControl.querySelector(`input[name="like"]`).checked;
  setTweetLiked(checked);
});

const hideImageHandler = () => {
  const checked = imageControl.querySelector(`input[name="image"]`).checked;
  setHideTweetImage(checked);
};

imageControl.addEventListener("click", hideImageHandler);
