const countdownElement = document.getElementById("countdown");
const visitNowBtn = document.getElementById("visitNowBtn");

// Set the countdown time in seconds
let countdownTime = 5;

// Start the countdown
function startCountdown() {
  countdownElement.textContent = countdownTime;
  const countdownInterval = setInterval(() => {
    countdownTime--;
    countdownElement.textContent = countdownTime;
    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      redirectToGitHub();
    }
  }, 1000); // 1000 milliseconds = 1 second
}

// Redirect to GitHub with referral
function redirectToGitHub() {
  const queryParams = new URLSearchParams(window.location.search);
  const ghQueryParam = queryParams.get("gh");
  if (ghQueryParam) {
    const referralValue = "https://github.com/SintcoLTD/url";
    const githubProfileUrl = `https://github.com/${ghQueryParam}?refer=${encodeURIComponent(referralValue)}`;
    window.location.href = githubProfileUrl;
  } else {
    console.error("GitHub username not provided in query parameter.");
  }
}

// Listen for "Visit Now" button click
visitNowBtn.addEventListener("click", redirectToGitHub);

// Start the countdown on page load
startCountdown();
