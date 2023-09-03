// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput !== "") {
    redirectToUrl(searchInput);
  }
}

// Function to redirect to the provided URL from the url parameter
function redirectToUrl(query) {
  const urlParams = new URLSearchParams(window.location.search);
  const targetUrl = urlParams.get("url");
  if (targetUrl) {
    // Add the refer parameter and redirect after a short delay (2 seconds)
    const referralValue = "https://github.com/SintcoLTD/url";
    const finalUrl = `${targetUrl}?refer=${referralValue}`;
    setTimeout(() => {
      window.location.href = finalUrl;
    }, 2000); // 2000 milliseconds = 2 seconds
  } else {
    console.error("URL not found in url parameter");
  }
}

// Listen for form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
