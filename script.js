// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput.trim() !== "") {
    processInputText(searchInput.trim()).then(processedText => {
      const queryString = encodeURIComponent(processedText);
      window.location.href = `index.html?q=${queryString}`;
    });
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
    // Load the JSON files containing the URL mappings
    const promises = [
      fetch("url.json").then(response => response.json()),
      fetch("short-terms.json").then(response => response.json())
    ];

    Promise.all(promises)
      .then(([urlMappings, shortTerms]) => {
        const targetUrl = getProcessedUrl(requestedUrl, urlMappings, shortTerms);

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
            window.location.href = requestedUrl;
          }
        } else {
          // If the query parameter is neither a valid short URL nor a valid URL, redirect to the index page
          alert("Invalid URL!");
          window.location.href = "index.html";
        }
      })
      .catch(error => {
        console.error("Error fetching url.json or short-terms.json:", error);
        alert("An error occurred while fetching the URL mappings.");
      });
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
  // Check if the requested URL is a short URL in url.json
  const targetUrl = urlMappings[requestedUrl];
  if (targetUrl) {
    return targetUrl;
  }

  // Process the input text and replace variable phrases
  const processedText = await processInputText(requestedUrl);

  // Check if the processed text is a short URL in url.json
  const processedTargetUrl = urlMappings[processedText];
  if (processedTargetUrl) {
    return processedTargetUrl;
  }

  // Check if the processed text is a valid URL after replacing variable phrases
  if (isValidUrl(processedText)) {
    return processedText;
  }

  return null;
}
