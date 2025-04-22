const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const SECRET_KEY = process.env.SECRET_KEY;
let cachedData = null;
let lastCheckedDate = null;

// JWT Generator
const getToken = (ip = process.env.IP) => {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign({
    iss: ip,
    iat: now - 300,
    exp: now + 300,
    sub: "capsula.application",
  }, SECRET_KEY, { algorithm: "HS256" });
};

// Fetch today's product data
const fetchProducts = async () => {
  const token = getToken();
  console.log(`Generated JWT Token: ${token}`); // Log the generated token
  const today = new Date().toISOString().split("T")[0];

  try {
    const res = await axios.post("https://api.billz.uz/v1/", {
      jsonrpc: "2.0",
      method: "products.get",
      params: {
        LastUpdatedDate: `${today}T00:00:00Z`,
        WithProductPhotoOnly: 0,
        IncludeEmptyStocks: 0,
      },
      id: "1",
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data?.result;
    if (data?.length) {
      cachedData = data;
      lastCheckedDate = today;
      console.log(`Updated ${data.length} products for ${today}`);
    } else {
      console.warn(`No data returned for ${today}`);
    }
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
};

// API
app.get("/fetch-products", (_, res) => {
  cachedData
    ? res.json({ lastCheckedDate, data: cachedData })
    : res.status(404).json({ error: "No data available" });
});

// Start
app.listen(port, () => {
  console.log(`Server http://192.168.68.107:${port}`);
  fetchProducts();
  setInterval(fetchProducts, 10 * 60 * 1000);
});