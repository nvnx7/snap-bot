function getPathFromUrl(url) {
  const link = document.createElement("a");
  link.href = url;
  return link.pathname;
}

function showErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  showLoading(false);
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideErrorMessage() {
  document.getElementById("error-message").style.display = "none";
}

function showLoading(show) {
  if (show) {
    document.getElementById("loading-indicator-container").style.display =
      "block";
    document.getElementById("tweet-search-btn").disabled = true;
  } else {
    document.getElementById("loading-indicator-container").style.display =
      "none";
    document.getElementById("tweet-search-btn").disabled = false;
  }
}
