// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput !== "") {
    redirectToUrl(searchInput);
  }
}

// Function to redirect to the provided URL with the refer parameter
function redirectToUrl(url) {
  const referralValue = "https://github.com/SintcoLTD/url";
  const finalUrl = `${url}?refer=${referralValue}`;
  
  // Redirect the user after a short delay (2 seconds)
  setTimeout(() => {
    window.location.href = finalUrl;
  }, 2000); // 2000 milliseconds = 2 seconds
}

// Listen for form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
