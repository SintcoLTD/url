// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput !== "") {
    redirectToUrl(searchInput);
  }
}

// Function to redirect to the provided URL from url.json
function redirectToUrl(query) {
  fetch("url.json")
    .then(response => response.json())
    .then(urlMappings => {
      const targetUrl = urlMappings[query];
      if (targetUrl) {
        // Add the refer parameter and redirect after a short delay (2 seconds)
        const referralValue = "https://github.com/SintcoLTD/url";
        const finalUrl = `${targetUrl}?refer=${referralValue}`;
        setTimeout(() => {
          window.location.href = finalUrl;
        }, 2000); // 2000 milliseconds = 2 seconds
      } else {
        console.error("URL not found in url.json");
      }
    })
    .catch(error => {
      console.error("Error fetching url.json:", error);
      alert("An error occurred while fetching the URL mappings.");
    });
}

// Listen for form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
