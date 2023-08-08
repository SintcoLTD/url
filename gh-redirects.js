// Get the query parameter from the URL
const queryParams = new URLSearchParams(window.location.search);
const githubUsername = queryParams.get("q");

if (githubUsername) {
  // Delay the redirect by 5 seconds
  setTimeout(() => {
    const githubProfileUrl = `https://github.com/${githubUsername}?refer=sintco-url-refer`;
    window.location.href = githubProfileUrl;
  }, 5000); // 5000 milliseconds = 5 seconds
} else {
  console.error("GitHub username not provided in query parameter.");
}
