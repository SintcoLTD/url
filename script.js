// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput.trim() !== "") {
    processInputText(searchInput.trim()).then(processedText => {
      window.location.href = `index.html?url=${processedText}`;
    });
  }
}

window.onload = function () {
  // Get the query parameter from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const requestedUrl = queryParams.get("url");

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
    // Process the input text and replace variable phrases
    processInputText(requestedUrl).then(processedText => {
      if (processedText) {
        // Check if the processed text is a valid URL
        if (isValidUrl(processedText)) {
          // Check if the processed text is a short URL in url.json
          fetch("url.json")
            .then(response => response.json())
            .then(urlMappings => {
              const targetUrl = urlMappings[processedText];
              if (targetUrl) {
                // Check if the target URL already contains query parameters
                const separator = targetUrl.includes("?") ? "&" : "?";

                // Append the referral parameter to the target URL
                const referralParam = "refer";
                const referralValue = "https://github.com/SintcoLTD/url";
                const finalUrl = `${targetUrl}${separator}${referralParam}=${referralValue}`;

                // Redirect the user to the final URL from url.json
                window.location.href = finalUrl;
              } else {
                // Redirect the user to the processed URL with the referral parameter
                const separator = processedText.includes("?") ? "&" : "?";
                const finalUrl = `${processedText}${separator}${referralParam}=${referralValue}`;
                window.location.href = finalUrl;
              }
            })
            .catch(error => {
              console.error("Error fetching url.json:", error);
              alert("An error occurred while fetching the URL mappings.");
              window.location.href = "index.html";
            });
        } else {
          // If the processed text is not a valid URL, display the name of the URL and redirect directly
          fetch("url.json")
            .then(response => response.json())
            .then(urlMappings => {
              const urlName = getUrlName(processedText, urlMappings);
              if (urlName) {
                const redirectElement = document.createElement("div");
                redirectElement.classList.add("redirect");
                redirectElement.innerText = `Redirecting to: ${urlName}`;
                suggestionsDiv.appendChild(redirectElement);
              }
              window.location.href = processedText;
            })
            .catch(error => {
              console.error("Error fetching url.json:", error);
              alert("An error occurred while fetching the URL mappings.");
              window.location.href = "index.html";
            });
        }
      } else {
        // If the query parameter is not a valid URL or short URL, redirect to the index page
        alert("Invalid URL!");
        window.location.href = "index.html";
      }
    });
  }

  // If there's a valid query parameter for GitHub profile, perform redirection
  const ghQueryParam = queryParams.get("gh");
  if (ghQueryParam) {
    // Redirect to the GitHub profile URL with refer
    const githubProfileUrl = `https://github.com/${ghQueryParam}?refer=https://github.com/SintcoLTD/url`;
    window.location.href = githubProfileUrl;
  }

  // Listen for input events in the search bar
  searchInput.addEventListener("input", () => {
    const inputText = searchInput.value.trim();
    const suggestions = getMatchingSuggestions(inputText);

    // Display suggestions
    displaySuggestions(suggestions);
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
};

// Function to get matching suggestions from url.json
function getMatchingSuggestions(inputText) {
  const suggestions = [];

  // Load the JSON file containing the URL mappings
  fetch("url.json")
    .then(response => response.json())
    .then(urlMappings => {
      const keys = Object.keys(urlMappings);
      for (const key of keys) {
        if (key.startsWith(inputText)) {
          suggestions.push(key);
        }
      }
    })
    .catch(error => {
      console.error("Error fetching url.json:", error);
    });

  return suggestions;
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

// Function to process the input text and replace variable phrases
async function processInputText(inputText) {
  // Load the short-terms.json file containing the variable phrases mappings
  try {
    const response = await fetch("short-terms.json");
    const shortTerms = await response.json();

    // Replace each variable phrase with its corresponding value
    for (const [key, value] of Object.entries(shortTerms)) {
      inputText = inputText.replace(new RegExp(key, "gi"), value);
    }

    // If the processed input is not a valid URL and doesn't include http:// or https://, add http:// as default
    if (!isValidUrl(inputText) && !inputText.startsWith("http://") && !inputText.startsWith("https://")) {
      inputText = "http://" + inputText;
    }

    return inputText;
  } catch (error) {
    console.error("Error fetching short-terms.json:", error);
    return inputText;
  }
}

// Function to get the processed URL
async function getProcessedUrl(requestedUrl, urlMappings, shortTerms) {
  // Process the input text and replace variable phrases
  const processedText = await processInputText(requestedUrl);

  // Check if the processed text is a short URL in url.json
  const targetUrl = urlMappings[processedText];
  if (targetUrl) {
    return targetUrl;
  }

  // Check if the processed text is a valid URL after replacing variable phrases
  if (isValidUrl(processedText)) {
    return processedText;
  }

  return null;
}
