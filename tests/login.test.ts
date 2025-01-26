import { chromium, expect } from "@playwright/test"
import { test } from "../base/pomFixture";
require('dotenv').config();

// const capabilities = {
//     browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
//     browserVersion: "latest",
//     "LT:Options": {
//         platform: "Windows 10",
//         build: "Playwright Test from config",
//         name: "Playwright Test - 1",
//         user: 'aleksavic87',
//         accessKey: 'k7gBmsXX67vrVLq0JRbMl7akfQXJdJ13ORRieHLVgODq4BhO6R',
//         network: true,
//         video: true,
//         console: true
//     },
// }

test.describe("Assignment", async () => {


    test("Test scenario 1", async ({ page, baseURL}, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        // const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        //     ${encodeURIComponent(JSON.stringify(capabilities))}`);
        // const context = await browser.newContext();
        // const page = await context.newPage();

        await page.goto(`${baseURL}`);
        await page.locator('text=Simple Form Demo').click();

        await expect(page).toHaveURL('https://www.lambdatest.com/selenium-playground/simple-form-demo');

        const variableMessage: string = 'Welcome to LambdaTest';
        const messageInput = page.locator("//input[@id='user-message']");   

        await expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message");
        await messageInput.type("Welcome to LambdaTest");  

        await page.click('#showInput');
        const displayedMessage: string | null = await page.textContent('#message');
        expect(displayedMessage).toBe(variableMessage), { timeout: 10000 };
        console.log('STATUS: ' + testInfo.status);

    })

    test("Test scenario 2", async ({ page, baseURL}, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        // const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        //     ${encodeURIComponent(JSON.stringify(capabilities))}`);
        // const context = await browser.newContext();
        // const page = await context.newPage();

        await page.goto(`${baseURL}`);
        await page.locator('text=Drag & Drop Sliders').click();

        const slider = page.locator("//h4[contains(text(),'Default value 15')]/following-sibling::div//input[@type='range']");
        const rangeValue = page.locator("//div[@class='sp__range sp__range-success']");

        await expect(rangeValue).toHaveText('15');

        const targetValue = 95;
        let currentValue = 15;
        while (currentValue < targetValue) {
            await slider.press('ArrowRight');
            currentValue++;
            await expect(rangeValue).toHaveText(currentValue.toString());
        }

        await expect(rangeValue).toHaveText('95');
        console.log('STATUS: ' + testInfo.status);
        // await browser.close();
    })

    test("Test scenario 3", async ({ page, baseURL}, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        // const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        //     ${encodeURIComponent(JSON.stringify(capabilities))}`);
        // const context = await browser.newContext();
        // const page = await context.newPage();

        await page.goto(`${baseURL}`);
        await page.locator('text=Input Form Submit').click();
        await page.locator("//button[contains(text(),'Submit')]").hover();
        await page.locator("//button[contains(text(),'Submit')]").click();

        const nameField = page.locator("//input[@id='name']");
        const validationMessage = await nameField.evaluate((element) => {
            const input = element as HTMLInputElement
            return input.validationMessage
            })
            const getExpectedMessage = (projectName) => {
                if (projectName.includes('Windows')) {
                    return 'Please fill out this field.';
                } else if (projectName.includes('MacOS')) {
                    return 'Please fill in this field.';
                }
                throw new Error('Unknown operating system or browser configuration.');
            };
        
            // Get the current project name
            const projectName = testInfo.project.name;
        
            // Validate the message
            const expectedMessage = getExpectedMessage(projectName); // Get the expected message
            expect(validationMessage).toBe(expectedMessage); // Compare with the actual message
        await nameField.fill('Test Name')
        await page.locator('[placeholder="Email"]').fill('test@mail.com')
        await page.getByPlaceholder('Password').fill('testPassword')
        await page.locator('[id="company"]').fill('Test Company')
        await page.locator('//input[@placeholder="Website"]').fill('test.com')
        await page.locator('[name="country"]').selectOption('United States')
        await page.getByPlaceholder('City').fill('Test City')
        await page.locator('[id="inputAddress1"]').fill('Test Street')
        await page.getByPlaceholder('Address 2').fill('Test adress2')
        await page.locator('//input[@id="inputState"]').fill('Test State')
        await page.getByPlaceholder('Zip code').fill('10001')

        await page.locator('select[name="country"]').selectOption({ label: 'United States' });

        await page.locator("//button[contains(text(),'Submit')]").click();
        
        const successMsg=await page.locator('[class="success-msg hidden"]').textContent()
        expect(successMsg).toContain('Thanks')
        console.log('STATUS: ' + testInfo.status);
        // await browser.close();
    })
})