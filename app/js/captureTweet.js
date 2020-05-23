const options = {
  conversations: "all",
  cards: "visible",
  width: "auto",
  align: "left",
  theme: "dark",
};

const shotOptions = {
  allowTaint: true,
  logging: true,
  scrollY: 165,
};

function embedTweet(id) {
  twttr.widgets.createTweet(id, document.getElementById("target"), options);
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

function getOffset() {
  const offset = [];
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const headerH = document.getElementById("app-header").clientHeight;
  const wrapper = document.getElementById("tweet-wrapper");

  if (wrapper.clientWidth - viewportW <= 0) offset.push(wrapper.scrollLeft);
  else offset.push(wrapper.clientWidth - viewportW);

  if (wrapper.clientHeight + headerH - viewportH <= 0)
    offset.push(wrapper.scrollTop);
  else offset.push(wrapper.clientHeight + headerH - viewportH);

  return offset;
}

function takeShot() {
  window.scrollTo(0, 0);
  html2canvas(document.getElementById("tweet-wrapper"), shotOptions).then(
    (canvas) => {
      document.body.appendChild(canvas);
      // downloadImage(canvas.toDataURL());
    }
  );
}
