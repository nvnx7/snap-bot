const tweetWrapper = document.getElementById("tweet-wrapper");

const theme = {
  dark: {
    background: "#000000",
    textColor: "#ffffff",
  },
  light: {
    background: "#ffffff",
    textColor: "#000000",
  },
};

function processText(text) {
  return text;
}

function setTweetText(text) {
  const processedText = processText(text);
  tweetWrapper.querySelector("#tweet-text").innerHTML = processedText;
}

function setTweetHeader(profilePicUrl, author, username, isVerified = false) {
  tweetWrapper.querySelector("#profile-pic").src = profilePicUrl;
  tweetWrapper.querySelector("#author").innerHTML = author;
  tweetWrapper.querySelector("#username").innerHTML = username;

  if (isVerified) {
    tweetWrapper.querySelector(
      "#verified-badge-container"
    ).innerHTML = `<img src="img/verified.png" alt="verified badge" />`;
  } else {
    tweetWrapper.querySelector("#verified-badge-container").innerHTML = "";
  }
}

function setTweetLiked(isLiked) {
  let imgSrc;
  let textColor;

  if (isLiked) {
    imgSrc = "img/liked.png";
    textColor = "red";
  } else {
    imgSrc = "img/normal.png";
    textColor = "white";
  }

  tweetWrapper.querySelector("#heart-img").src = imgSrc;
  tweetWrapper.querySelector("#like-count").style.color = textColor;
}

function setTweetFooter(likeCount, timeString) {
  tweetWrapper.querySelector("#like-count").innerHTML = likeCount;
  tweetWrapper.querySelector("#tweet-time").innerHTML = timeString;
}

function switchTheme() {
  if (tweetWrapper.classList.contains("dark")) {
    tweetWrapper.classList.remove("dark");
    tweetWrapper.classList.add("light");
  } else {
    tweetWrapper.classList.remove("light");
    tweetWrapper.classList.add("dark");
  }
}
