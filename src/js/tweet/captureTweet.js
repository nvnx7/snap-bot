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
  // options.scrollX = -9;

  // options.backgroundColor = theme === "dark" ? "#000000" : "#ffffff";

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const headerH = document.getElementById("app-header").clientHeight;
  const wrapper = document.getElementById("tweet-wrapper");

  if (wrapper.clientWidth - viewportW > 0)
    options.scrollX = -(wrapper.clientWidth - viewportW);

  if (wrapper.clientHeight + headerH - viewportH > 0)
    options.scrollY = wrapper.clientHeight + headerH - viewportH;

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
