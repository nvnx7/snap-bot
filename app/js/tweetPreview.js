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
  // TODO May need to wrap text with <p>....</p>
  tweetWrapper.querySelector(
    "#tweet-text"
  ).innerHTML = `<p>${processedText}</p>`;
}

function setTweetHeader(profilePicUrl, author, username, isVerified = false) {
  tweetWrapper.querySelector("#profile-pic").src = profilePicUrl;
  tweetWrapper.querySelector("#author").innerHTML = author;
  tweetWrapper.querySelector("#username").innerHTML = `@${username}`;

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
    textColor = "#ff0000";
  } else {
    imgSrc = "img/normal.png";
    textColor = "#8899a6";
  }

  tweetWrapper.querySelector("#heart-img").src = imgSrc;
  tweetWrapper.querySelector("#like-count").style.color = textColor;
}

function setTweetFooter(likeCount, timeString) {
  tweetWrapper.querySelector("#like-count").innerHTML = likeCount;
  tweetWrapper.querySelector("#tweet-time").innerHTML = timeString;
}

function switchTheme(theme) {
  if (theme === "light") {
    tweetWrapper.classList.remove("dark");
    tweetWrapper.classList.add("light");
  } else {
    tweetWrapper.classList.remove("light");
    tweetWrapper.classList.add("dark");
  }
}
