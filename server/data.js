const axios = require("axios");
const fs = require("fs");
const path = require("path");

const diskList = ['C:', 'D:', 'E:'];
const API_URL = "http://localhost:3000/fetch-products";
const OUTPUT_DIR = `${diskList[0]}\\Helpi\\inventory\\app\\predictions\\files`;

// Fetch product data from the API
async function fetchProducts() {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200 && Array.isArray(response.data.data)) {
      return {
        products: response.data.data,
        lastCheckedDate: response.data.lastCheckedDate || "",
      };
    } else {
      throw new Error("Invalid API response format.");
    }
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    throw err;
  }
}

// Format data into tab-separated values
function formatProducts(products, lastCheckedDate) {
  const header = [
    "Name", "Price", "PriceUSD", "DiscountAmount", "Qty",
    "Category", "Size", "OfficeName", "LastCheckedDate"
  ].join("\t");

  const rows = products.flatMap(product =>
    product.offices.map(office => [
      product.name || "",
      product.price || "",
      product.priceUSD || "",
      product.discountAmount || "",
      office.qty || "",
      product.properties?.CATEGORY || "",
      product.properties?.SIZE || "",
      office.officeName || "",
      lastCheckedDate
    ].join("\t"))
  );

  return [header, ...rows].join("\n");
}

// Save data to a .txt file
function saveToFile(content) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const fileName = `${date}.txt`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`File saved: ${filePath}`);
}

// Main function to run everything
async function main() {
  try {
    console.log("Starting product fetch and save...");

    // Optional wait for server to be ready
    await new Promise(res => setTimeout(res, 5000));

    const { products, lastCheckedDate } = await fetchProducts();
    const content = formatProducts(products, lastCheckedDate);
    saveToFile(content);

    console.log("Done.");
  } catch (err) {
    console.error("Error in main():", err.message);
    process.exit(1);
  }
}

main();
