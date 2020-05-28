document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("tweet-search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    showLoading(true);
    // TODO Check url validity
    const url = document.getElementById("tweet-link").value;

    const data = new URLSearchParams();
    data.append("tweetUrl", url);

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
        console.log(`Data response: ${JSON.stringify(tweetData)}`);
        window.sessionStorage.setItem(tweetData.id, JSON.stringify(tweetData));
        window.location.href = `/tweet/${tweetData.id}`;
      })
      .catch((err) => {
        showLoading(false);
        console.log(`Error ${err}`);

        if (err.name == "404") showErrorMessage(err.message);
        else showErrorMessage("Network error!");
      });
  });

  document.getElementById("tweet-link").addEventListener("focus", () => {
    hideErrorMessage();
  });
});
