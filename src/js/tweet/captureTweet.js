function fetchTweet(tweetId, callback) {
  const data = new URLSearchParams();
  data.append("tweetUrl", `/tweet/${tweetId}`);

  // const endpoint = `/tweet`;
  fetch("/tweet", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        const err = Error();
        err.name = "404";
        err.message = response.statusText;
        throw err;
      }
      return response.json();
    })
    .then((tweetData) => {
      // console.log(`Data retrieved ${tweetData}`);
      callback(tweetData);
    })
    .catch((err) => {
      setTweetLoading(false);
      console.log(`Error fetching data: ${err}`);
      if (err.name == "404") showErrorMessage(err.message);
      else showErrorMessage("Network error!");
    });
}

function downloadImage(uri, filename = "tweet.png") {
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

function composeOptions(theme) {
  const options = {};
  options.allowTaint = true;
  options.removeContainer = true;
  options.backgroundColor = "red";

  if (scrollbarYVisible()) {
    options.x =
      tweetWrapper.getBoundingClientRect().left + getScrollbarWidth() / 2;
  }

  options.backgroundColor = theme === "dark" ? "#000000" : "#ffffff";

  return options;
}

function takeShot() {
  window.scrollTo(0, 0);
  html2canvas(
    document.getElementById("tweet-wrapper"),
    composeOptions("light")
  ).then((canvas) => {
    document.body.appendChild(canvas);
    // downloadImage(canvas.toDataURL());
  });
}

function getLocaleDateString(utcString) {
  const date = new Date(utcString);
  const localeTime = date.toLocaleTimeString("default", { timeStyle: "short" });
  const localeDate = date.toLocaleDateString("default", {
    dateStyle: "medium",
  });
  return `${localeTime} - ${localeDate}`;
}

function setTweetLoading(show) {
  if (show) {
    tweetWrapper.style.display = "none";
    document
      .getElementById("wrapper")
      .insertBefore(loadingIndicator, tweetWrapper);
  } else {
    document.getElementById("wrapper").removeChild(loadingIndicator);
    tweetWrapper.style.display = "block";
  }
}

function showErrorMessage(message) {
  tweetWrapper.style.display = "none";
  errorMessage.textContent = message;
  document.getElementById("wrapper").insertBefore(errorMessage, tweetWrapper);
}

function hideErrorMessage() {
  document.getElementById("wrapper").removeChild(errorMessage);
}

function createLoadingIndicator() {
  const elem = document.createElement("DIV");
  elem.className = "preloader-wrapper active";
  elem.id = "loading-indicator";

  elem.innerHTML = `<div class="spinner-layer spinner-blue-only">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
 </div>`;

  return elem;
}

function createErrorMessage() {
  const elem = document.createElement("DIV");
  elem.id = "error-message";
  return elem;
}

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

function scrollbarYVisible() {
  return (
    document.documentElement.scrollHeight >
    document.documentElement.clientHeight
  );
}
