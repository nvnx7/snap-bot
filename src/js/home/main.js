document.getElementById("tweet-search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const url = document.getElementById("tweet-link").value;

  const data = new URLSearchParams();
  data.append("tweetUrl", url);

  fetch("/tweet", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(`Data response: ${data}`);
    })
    .catch((err) => {});
});
