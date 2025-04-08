const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const app = express();
const port = 5000;
// Secret key for JWT
const SECRET_KEY = "IGGnmFVUxELFmopRaQpKYiUbyjUrRKud9NwJhaBvEkrBSBQkhzuIWzNGQbDDpPyWsHPTNQnEA2mSJKmeJoYoJHJpPynWP9SWSFvGsDPHFfAfKzmZpBRzWImhGbrDpeBSKhYBN0Lp7YTuHVpeZDwmiEDYhMKhHrZRMyhx0x5jZkUdEbLheNrxJessujIV6LfGXBthuEnZNRQMFofL0beRURiHIQTsjvpWLn4XGYfTeGkPtx1uKonmdoofsmZczd8adbKLnLF2Gpfo5mBTEfEMJdddYkBfcCTIivBhjIysct96bpywtd5JhzeDMmsp5YnNJhuXv0JHydektCasNrrjcxkUhTVxhLFnAUQwpIDsHuuABeuBcIYrWxIRarvcnpUzxUGikDJVKKIDCFvjbuNEkoEAKmxCy8RFPBIMIeWNtHTzEEBcKjGweYZi2eKj1bbzmspKkSxUciDNTfCvUEYDWsNUfTwJfyMEzjkNxyWnrJmXFcdAJjnyTPusLLvrsKyC";
// Cached data and date variables
let cachedData = null;
let lastCheckedDate = new Date().toISOString().split("T")[0]; // Initialize with the current date
let timer = null;
// Function to fetch IP address using Puppeteer
const fetchIPAddress = async () => {
  let previousIP = null;
  while (true) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );
      await page.goto("https://whatismyipaddress.com/");
      
      await page.waitForSelector(".ip-address #ipv4 a");
      const currentIP = await page.$eval(
        ".ip-address #ipv4 a",
        (el) => el.textContent.trim()
      );
      console.log(`Current IP Address: ${currentIP}`);
      if (currentIP !== previousIP) {
        console.log("IP Address has changed. Updating .env file...");
        const tokenFolder = path.resolve(__dirname, "ip");
        const envPath = path.join(tokenFolder, ".env");
        if (!fs.existsSync(tokenFolder)) {
          fs.mkdirSync(tokenFolder);
          console.log(`Created folder: ${tokenFolder}`);
        }
        fs.writeFileSync(envPath, `IP=${currentIP}`, "utf-8");
        console.log(`New IP Address saved to ${envPath} as IP=${currentIP}`);
        previousIP = currentIP;
      } else {
        console.log("IP Address has not changed. No update needed.");
      }
      await browser.close();
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute before checking again
  }
};
const getBillzToken = (expireMinutes = 5, ip = process.env.IP) => {
  const currentTime = Math.floor(Date.now() / 1000) - 5 * 60;
  const expiredTime = Math.floor(Date.now() / 1000) + expireMinutes * 60;
  const payload = {
    iss: ip,
    iat: currentTime,
    exp: expiredTime,
    sub: "capsula.application",
  };
  const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
  console.log(`Generated JWT Token: ${token}`); // Log the generated token
  return token;
};

// Function to fetch products for a specific date
const fetchProductsFromAPI = async (date) => {
  const currentIP = process.env.IP;
  const token = getBillzToken(5, currentIP);
  try {
    const response = await axios.post(
      "https://api.billz.uz/v1/",
      {
        jsonrpc: "2.0",
        method: "products.get",
        params: {
          LastUpdatedDate: `${date}T00:00:00Z`,
          WithProductPhotoOnly: 0,
          IncludeEmptyStocks: 0,
        },
        id: "1",
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data.result; // Assuming the API returns a 'result' key
  } catch (error) {
    console.error(`Error fetching products for date ${date}:`, error.message);
    throw new Error("Error fetching products");
  }
};
// Function to update the data
const updateData = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  let dateToCheck = currentDate;
  try {
    let data = null;
    let attempts = 0; // Safety mechanism to prevent infinite loops
    const maxAttempts = 30; // Check up to 30 days back
    // Loop to fetch data for previous dates until data is found or maxAttempts are reached
    while ((!data || data.length === 0) && attempts < maxAttempts) {
      console.log(`Fetching data for date: ${dateToCheck}`);
      data = await fetchProductsFromAPI(dateToCheck);
      // If no data, move to the previous date
      if (!data || data.length === 0) {
        attempts++;
        const previousDate = new Date(dateToCheck);
        previousDate.setDate(previousDate.getDate() - 1); // Move to the previous day
        dateToCheck = previousDate.toISOString().split("T")[0];
      }
    }
    // Update cached data and last checked date if valid data is found
    if (data && data.length > 0) {
      cachedData = data;
      lastCheckedDate = dateToCheck;
      console.log(`Data updated for date: ${dateToCheck}`);
    } else {
      console.log("No data found within the last 30 days.");
    }
  } catch (error) {
    console.error(`Failed to update data: ${error.message}`);
  }
};

// API endpoint to fetch products
app.get("/fetch-products", async (req, res) => {
  if (!cachedData) {
    return res.status(404).json({ error: "No data available" });
  }
  res.json({
    lastCheckedDate,
    data: cachedData,
  });
});
// Start a timer to update data every 10 minutes
timer = setInterval(updateData, 10 * 60 * 1000); // 10 minutes in milliseconds
// Initial data fetch
updateData();
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
process.on("SIGINT", () => {
  clearInterval(timer); // Clear the timer on server shutdown
  console.log("Server stopped.");
  process.exit();
});