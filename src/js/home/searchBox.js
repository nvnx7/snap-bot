function getPathFromUrl(url) {
  const link = document.createElement("a");
  link.href = url;
  return link.pathname;
}
