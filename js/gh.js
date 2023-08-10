const queryParams = new URLSearchParams(window.location.search);
const ghQueryParam = queryParams.get("gh");

// Redirect to GitHub with referral after 5 seconds
if (ghQueryParam) {
  const referralValue = "https://github.com/SintcoLTD/url";
  const githubProfileUrl = `https://github.com/${ghQueryParam}?refer=${referralValue}`;
  setTimeout(() => {
    window.location.href = githubProfileUrl;
  }, 5000); // 5000 milliseconds = 5 seconds
} else {
  console.error("GitHub username not provided in query parameter.");
}
