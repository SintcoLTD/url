# Sintco URL

The URL redirecting Web Program is a simple web application that allows users to redirect URLs with refer and create shortcuts for frequently used URLs. It is based on HTML, JavaScript, and JSON for data storage.

## Features

1. URL Redirection: When a user visits a shortened URL, the program will redirect them to the original URL associated with the short link.

2. Custom Shortcuts: Users can create custom shortcuts for frequently used URLs. Shortcuts are stored in the `short-terms.json` file, allowing for quick access to specific URLs.

3. Referral Parameter: The program adds a `refer` parameter to the redirected URLs, allowing tracking of referrals.

4. URL Suggestions: The search feature in the web application provides temporary suggestions based on previously shortened URLs in the `url.json` file.

5. GitHub Profile Shortcut: Users can use the `?gh=` query parameter to quickly redirect to GitHub profiles. For example, `?gh=najmajmal` redirects to `https://github.com/najmajmal`.

## How to Use

1. Access the Web Application: Open `index.html` in your web browser. The application will load, and you will see a search bar.

2. Shorten a URL: Enter a long URL into the search bar and press Enter. The application will create a shortened version of the URL. If the URL is not already in the `url.json` file, the application will redirect with the referral parameter. If the URL is already in `url.json`, the application will prioritize the saved URL and redirect with the referral parameter.

3. Create Custom Shortcuts: To create a custom shortcut, use the `?url=` query parameter followed by the shortcut name and the URL you want to associate with it. For example, `?url=gh-najmajmal` creates a shortcut `gh-najmajmal` for `https://github.com/najmajmal`.

4. Redirect to GitHub Profile: Use the `?gh=` query parameter to redirect to GitHub profiles. For example, `?gh=najmajmal` redirects to `https://github.com/najmajmal`.

5. Temporary Suggestions: When typing in the search bar, the application will provide temporary suggestions based on previous URLs in the `url.json` file. Pressing the Tab key will accept the suggestion and complete the input.

## Data Storage

- `url.json`: This JSON file stores the mappings between shortened URLs and their corresponding original URLs.

- `short-terms.json`: This JSON file stores the mappings between custom shortcuts and the URLs they point to.

## Note

- The web application assumes that URLs are either HTTP or HTTPS and automatically adds `http://` as a default for URLs that do not include a protocol.

- If the entered URL is invalid or lacks a proper HTTP/HTTPS prefix, the application will display an error message.

- The referral parameter `refer` is added to all redirected URLs.

## Contributing

Contributions to this project are welcome! If you have any suggestions, bug fixes, or feature enhancements, please feel free to create a pull request.

## License

This web program is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the license.

---
