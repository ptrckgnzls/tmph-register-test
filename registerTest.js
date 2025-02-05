import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome'; // Import chrome options directly
import * as chai from 'chai';
const assert = chai.assert;

async function runTests() {
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new Options())  // Set the Chrome options
        .build();


    try {
        // Step 1: Navigate to Registration Page
        await driver.get('http://localhost:3000/register');
        let pageTitle = await driver.getTitle();
        console.log("Page Title:", pageTitle);

        // Check if required fields exist
        assert.isTrue(await driver.findElement(By.id('firstName')).isDisplayed(), "First Name field not found");
        assert.isTrue(await driver.findElement(By.id('lastName')).isDisplayed(), "Last Name field not found");
        assert.isTrue(await driver.findElement(By.id('email')).isDisplayed(), "Email field not found");
        assert.isTrue(await driver.findElement(By.id('phone')).isDisplayed(), "Phone Number field not found");
        assert.isTrue(await driver.findElement(By.id('submit')).isDisplayed(), "Submit button not found");

        // Step 2: Valid Registration
        await driver.findElement(By.id('firstName')).sendKeys('John');
        await driver.findElement(By.id('lastName')).sendKeys('Doe');
        await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
        await driver.findElement(By.id('phone')).sendKeys('09088175555');
        await driver.findElement(By.id('submit')).click();

        // Wait for dashboard page
        await driver.wait(until.elementLocated(By.xpath("//p[contains(text(),'Welcome')]")), 10000);
        assert.isTrue(await driver.findElement(By.xpath("//p[contains(text(),'Welcome')]")).isDisplayed(), "Dashboard not displayed");

        // Step 3: Invalid Phone and Valid Email
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.id('email')).sendKeys('valid_user@example.com');
        await driver.findElement(By.id('phone')).sendKeys('invalid-phone');
        await driver.findElement(By.id('submit')).click();
        let phoneError = await driver.findElement(By.id('phone-error')).getText();
        assert.strictEqual(phoneError, "Incorrect phone number format.", "Phone number validation failed");

        // Step 4: Invalid Email and Valid Phone
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.id('email')).sendKeys('invalid_email');
        await driver.findElement(By.id('phone')).sendKeys('09088175555');
        await driver.findElement(By.id('submit')).click();
        let emailError = await driver.findElement(By.id('email-error')).getText();
        assert.strictEqual(emailError, "Incorrect email format.", "Email validation failed");

        // Step 5: Empty Fields Validation
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.id('submit')).click();
        let emptyError = await driver.findElement(By.id('error-message')).getText();
        assert.strictEqual(emptyError, "Email and Phone number cannot be empty.", "Empty fields validation failed");

        // Step 6: Special Characters in Fields
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.id('email')).sendKeys('!@#user@#$%^');
        await driver.findElement(By.id('phone')).sendKeys('!@#user@#$%^');
        await driver.findElement(By.id('submit')).click();
        let specialCharError = await driver.findElement(By.id('error-message')).getText();
        assert.strictEqual(specialCharError, "Invalid input format.", "Special character validation failed");

    } catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.quit();
    }
}

runTests();
