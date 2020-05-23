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
  setImageFromURL(profilePicUrl, tweetWrapper.querySelector("#profile-pic"));
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

function setTweetImage(imageUrl) {
  if (imageUrl)
    setImageFromURL(imageUrl, tweetWrapper.querySelector("#tweet-image"));
}

function setHideTweetImage(show) {
  if (show)
    tweetWrapper.querySelector("#tweet-image-container").style.display = "none";
  else
    tweetWrapper.querySelector("#tweet-image-container").style.display =
      "block";
}

function disableImageControl() {
  imageControl.querySelector(`input[name="image"]`).disabled = true;
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

function setTheme(theme) {
  if (theme === "light") {
    tweetWrapper.classList.remove("dark");
    tweetWrapper.classList.add("light");
  } else {
    tweetWrapper.classList.remove("light");
    tweetWrapper.classList.add("dark");
  }
}

function setImageFromURL(url, targetImgElement) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      var reader = new FileReader();
      reader.onload = function () {
        targetImgElement.src = this.result;
      };
      reader.readAsDataURL(blob);
    });
}
