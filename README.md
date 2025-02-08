# Selenium WebDriver Automated Test for Registration Page

## Overview

This project is an automated test script written in JavaScript using Selenium WebDriver and Chai assertion library. The script performs various validation checks on a registration page, including field presence, valid and invalid input cases, and error message verification.

## Prerequisites

Ensure you have the following installed before running the test:

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [Google Chrome](https://www.google.com/chrome/)
- Chrome WebDriver
- Required Node.js dependencies

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
2. Install dependencies by running:
   ```sh
   npm install selenium-webdriver chai
   ```

## Running the Test

1. Ensure your registration page is running locally at `http://localhost:3000/register`.
2. Execute the script using the following command:
   ```sh
   node registerTest.js
   ```

## Test Cases

The script validates the following:

1. **Field Presence**: Checks if all required fields and the submit button exist.
2. **Valid Registration**: Fills out the form with valid data and verifies navigation to the dashboard.
3. **Invalid Phone, Valid Email**: Checks error handling for incorrect phone numbers.
4. **Invalid Email, Valid Phone**: Checks error handling for incorrect email format.
5. **Empty Fields**: Verifies error message when required fields are left blank.
6. **Special Character Validation**: Ensures special characters are not accepted in email and phone fields.

## Error Handling

If a test fails, an error message will be logged in the console. Common reasons include:

- The registration page is not running.
- Element locators (IDs) in the script do not match the actual page elements.
- The expected validation messages are different from those implemented in the UI.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Describe your changes"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## Notes

- The test script uses `chai.assert` for assertions.
- Test results and errors will be displayed in the console.
- Modify the script as needed to match any updates in the registration page.

## License

This project is open-source and can be modified and distributed freely.

