// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput.trim() !== "") {
    const queryString = encodeURIComponent(searchInput.trim());
    window.location.href = `index.html?q=${queryString}`;
  }
}

window.onload = function() {
  // Get the query parameter from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const requestedUrl = queryParams.get("q");

  const searchInput = document.getElementById("searchInput");
  const suggestionsDiv = document.getElementById("suggestions");

  // Function to check if the input is a valid URL or domain
  function isValidUrl(url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  // If there's a valid query parameter, perform redirection
  if (requestedUrl) {
    // Load the JSON file containing the URL mappings
    fetch("url.json")
      .then(response => response.json())
      .then(urlMappings => {
        const targetUrl = urlMappings[requestedUrl];

        if (targetUrl) {
          // Check if the target URL already contains query parameters
          const separator = targetUrl.includes("?") ? "&" : "?";

          // Append the referral parameter to the target URL
          const referralParam = "refer";
          const referralValue = "sintco-url-refer";
          const finalUrl = `${targetUrl}${separator}${referralParam}=${referralValue}`;

          // Redirect the user to the final URL from url.json
          window.location.href = finalUrl;
        } else if (isValidUrl(requestedUrl)) {
          // If the requested short URL is not found in the JSON, but it's a valid URL, display the name of the URL
          const urlName = getUrlName(requestedUrl, urlMappings);
          if (urlName) {
            const redirectElement = document.createElement("div");
            redirectElement.classList.add("redirect");
            redirectElement.innerText = `Redirecting to: ${urlName}`;
            suggestionsDiv.appendChild(redirectElement);
          } else {
            // If the URL name is not found, redirect directly
            redirectToEnteredUrl(requestedUrl);
          }
        } else {
          // If the query parameter is neither a valid short URL nor a valid URL, redirect to the index page
          alert("Invalid URL!");
          window.location.href = "index.html";
        }
      })
      .catch(error => {
        console.error("Error fetching url.json:", error);
        alert("An error occurred while fetching the URL mappings.");
      });
  }

  // Listen for input events in the search bar
  searchInput.addEventListener("input", () => {
    const inputText = searchInput.value.trim();
    getMatchingSuggestions(inputText).then(suggestions => {
      // Display suggestions
      displaySuggestions(suggestions);
    });
  });

  // Handle tab key press to accept suggestion
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      event.preventDefault();
      const selectedSuggestion = suggestionsDiv.querySelector(".selected");
      if (selectedSuggestion) {
        searchInput.value = selectedSuggestion.innerText;
        suggestionsDiv.innerHTML = "";
      }
    }
  });

  // Handle Enter key press to redirect directly
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      redirectToEnteredUrl(searchInput.value.trim());
    }
  });
};

// Function to get matching suggestions from url.json
function getMatchingSuggestions(inputText) {
  // Load the JSON file containing the URL mappings
  return fetch("url.json")
    .then(response => response.json())
    .then(urlMappings => {
      const suggestions = [];
      const keys = Object.keys(urlMappings);
      for (const key of keys) {
        if (key.startsWith(inputText)) {
          suggestions.push(key);
        }
      }
      return suggestions;
    })
    .catch(error => {
      console.error("Error fetching url.json:", error);
      return [];
    });
}

// Function to display suggestions
function displaySuggestions(suggestions) {
  const suggestionsDiv = document.getElementById("suggestions");
  suggestionsDiv.innerHTML = "";

  for (const suggestion of suggestions) {
    const suggestionElement = document.createElement("div");
    suggestionElement.classList.add("suggestion");
    suggestionElement.innerText = suggestion;

    suggestionElement.addEventListener("click", () => {
      const searchInput = document.getElementById("searchInput");
      searchInput.value = suggestion;
      suggestionsDiv.innerHTML = "";
    });

    suggestionsDiv.appendChild(suggestionElement);
  }
}

// Function to get the name of the URL from the URL mappings
function getUrlName(targetUrl, urlMappings) {
  for (const [key, value] of Object.entries(urlMappings)) {
    if (value === targetUrl) {
      return key;
    }
  }
  return null;
}

// Function to redirect directly to the entered URL
function redirectToEnteredUrl(enteredUrl) {
  // Check if the entered URL starts with "www."
  if (enteredUrl.startsWith("www.")) {
    // Prepend "http://" to the entered URL and redirect
    window.location.href = `http://${enteredUrl}`;
  } else {
    // Prepend "http://" to the entered URL and redirect
    window.location.href = `http://${enteredUrl}`;
  }
}
