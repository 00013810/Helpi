const axios = require("axios");
const fs = require("fs");
const path = require("path");

// API endpoint
const API_URL = "http://localhost:5000/fetch-products"; // Update this if needed

// Directory to save the .txt file
const OUTPUT_DIR = "C:\\Helpi\\inventory\\app\\predictions\\files";

// Function to fetch product data from the API
const fetchProducts = async () => {
  try {
    console.log("Fetching products from the API...");
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data); // Debugging log
    if (response.status === 200) {
      const { data: products, lastCheckedDate } = response.data;
      if (Array.isArray(products)) {
        console.log(`Fetched ${products.length} products.`);
        return { products, lastCheckedDate };
      } else {
        throw new Error("Invalid data format received from the API.");
      }
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error.message);
    process.exit(1); // Exit the script with an error code
  }
};

// Function to process and save the data into a .txt file
const saveDataToFile = (products, lastCheckedDate) => {
  // Ensure the output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  // Extract and format the required fields
  const formattedData = products.flatMap((product) =>
    product.offices.map((office) => ({
      name: product.name || "",
      price: product.price || "",
      priceUSD: product.priceUSD || "",
      discountAmount: product.discountAmount || "",
      qty: office.qty || "",
      category: product.properties?.CATEGORY || "",
      size: product.properties?.SIZE || "",
      officeName: office.officeName || "",
      lastCheckedDate: lastCheckedDate || "",
    }))
  );

  // Define the header row
  const header = [
    "Name",
    "Price",
    "PriceUSD",
    "DiscountAmount",
    "Qty",
    "Category",
    "Size",
    "OfficeName",
    "LastCheckedDate",
  ].join("\t");

  // Convert the data into tab-separated rows
  const rows = formattedData.map((item) => [
    item.name,
    item.price,
    item.priceUSD,
    item.discountAmount,
    item.qty,
    item.category,
    item.size,
    item.officeName,
    item.lastCheckedDate,
  ].join("\t"));

  // Combine header and rows
  const txtContent = [header, ...rows].join("\n");

  // Define the file path
  const fileName = `Products_Report_${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".")}.txt`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  // Write the content to the file
  fs.writeFileSync(filePath, txtContent, "utf-8");
  console.log(`Data saved to file: ${filePath}`);
};

// Main function to execute the script
(async () => {
  try {
    // Wait for the server to initialize and populate cachedData
    setTimeout(async () => {
      const { products, lastCheckedDate } = await fetchProducts();
      saveDataToFile(products, lastCheckedDate);
    }, 5000); // Wait 5 seconds
  } catch (error) {
    console.error("Script execution failed:", error.message);
    process.exit(1);
  }
})();