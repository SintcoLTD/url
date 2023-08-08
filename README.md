# Sintco URL Web Application

The Sintco URL Web Application is a simple tool that allows users to create redirects for URLs. This application is designed to accept a URL through a query parameter and redirect the user to the provided URL after a short delay, with an optional referral parameter.

## Features

### Redirecting URLs with Referral Parameter

The primary purpose of the application is to redirect users to URLs provided through the `?url=` query parameter. The redirected URL will also include a referral parameter (`refer`) that indicates the source of the redirection. This is helpful for tracking referral sources.

### Delayed Redirection

After the user submits a URL, the application will wait for a short delay before redirecting them to the specified URL. The default delay is 2 seconds. This provides a brief moment for users to understand the redirection and the referral source.

## How to Use

1. **Access the Application**: Open `index.html` in your web browser. You'll see a simple form with an input field for entering a URL.

2. **Enter a URL**: In the input field, type the URL you want to redirect to. Ensure that the URL includes the protocol (`http://` or `https://`).

3. **Submit**: Click the "Redirect" button to submit the URL.

4. **Redirection**: After submitting, the application will wait for a brief delay (2 seconds) and then redirect you to the specified URL. You'll notice the `refer` parameter added to the URL indicating the source of the redirection.

## Example Usage

Let's say you want to redirect users to `https://example.com` with a referral to your GitHub repository.

1. Open `index.html` in your browser.

2. Enter the following URL in the input field:
   ```
   https://example.com
   ```

3. Click "Redirect."

4. After the delay, you'll be redirected to:
   ```
   https://example.com?refer=https://github.com/SintcoLTD/url
   ```

## Customization

If you need to adjust the delay or change the referral source, you can modify the JavaScript code in `script.js`.

## Note

- The application assumes that the provided URL includes the protocol (`http://` or `https://`). If not, the redirection might not work as expected.

- The referral parameter is added for tracking purposes and can be modified in the JavaScript code if needed.

## Contributing

Contributions to this project are welcome! Feel free to fork the repository, make improvements, and create pull requests.

## License

This web application is open-source and licensed under the [MIT License](LICENSE).

---
