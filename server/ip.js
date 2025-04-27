const puppeteer = require('puppeteer');
const fs = require('fs');
const dotenv = require('dotenv');

// Load existing .env (if it exists)
dotenv.config();

// variable creation
let previousIP = null;
const selectedElemetFromPage = ".ip-address #ipv4";
const timeInterval = 10 * 60 * 1000;

// function logic for launching browser
async function launchBrowser() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    return { browser, page };
}

// function logic for getting current IP address
async function getCurrentIpAdress(page) {
    await page.goto("https://whatismyipaddress.com/", {
        waitUntil: 'networkidle0',
    });

    console.log('Web page is open right now');

    await page.waitForSelector(selectedElemetFromPage, { timeout: 10000 });

    const ip = await page.$eval(selectedElemetFromPage, el => el.textContent.trim());

    return ip;
}
// save current ip to .env file
function saveIPToEnv(ip) {
    const envContent = `CURRENT_IP=${ip}\n`;
    fs.writeFileSync('.env', envContent);
    console.log(`Saved IP to .env: ${ip}`);
}
// main function
async function run() {
    while (true) {
        const { browser, page } = await launchBrowser();

        try {
            const currentIP = await getCurrentIpAdress(page);
            if (currentIP !== previousIP) {
                console.log(`Current IP Address: ${currentIP}`);
                previousIP = currentIP;
                saveIPToEnv(currentIP);
            } else {
                console.log(`IP has not changed: ${currentIP}`);
            }
        } catch (error) {
            console.error("Error retrieving IP address:", error.message);
        }

        await browser.close();

        // Wait 10 minutes before checking again
        await new Promise(resolve => setTimeout(resolve, timeInterval));
    }
}

run().catch(console.error);
