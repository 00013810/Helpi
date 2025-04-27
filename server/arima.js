// Import necessary packages
const fs = require("fs");
const path = require("path");
const ARIMA = require("arima");

// Set input and output folders
const inputFolder = "C:\\Helpi\\inventory\\app\\predictions\\files";
const outputFolder = "C:\\Helpi\\inventory\\app\\predictions\\models";

// We'll save all inventory data here
let inventoryData = {};

// Read all inventory .txt files
function loadInventoryData() {
  return new Promise((resolve) => {
    try {
      const files = fs.readdirSync(inputFolder);
      files.forEach(file => {
        const filePath = path.join(inputFolder, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const lines = content.split("\n");

        // Skip the header row (i=0)
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue; // skip empty lines

          const parts = line.split("\t"); // split by tab
          const name = parts[0];
          const size = parts[1];
          const qtyStr = parts[2];

          // parse qty into integer type
          const qty = parseInt(qtyStr, 10);

          // creation of unique product as T-Shirt_M 
          const key = `${name}_${size}`;

          if (!isNaN(qty)) {
            if (!inventoryData[key]) {
              inventoryData[key] = [];
            }
            // add qty to product
            inventoryData[key].push(qty);
          }
        }
      });

      // finish program
      resolve();
    } catch (error) {
      console.log("Resolve error: " + error)
    }
  });
}

// Predict future inventory
function predictInventory() {
  const results = [];

  for (const key in inventoryData) {
    const quantities = inventoryData[key];

    // quantity is less than 3
    if (quantities.length < 3) {
      console.log(`Not enough data for: ${key}`);
      continue;
    }

    const model = new ARIMA({ p: 2, d: 1, q: 2 }).train(quantities);
    const [predictedQty] = model.predict(1);

    // Calculate Accuracy (MAPE)
    let totalError = 0;
    for (let i = 0; i < quantities.length - 1; i++) {
      const predicted = model.predict(1)[0];
      if (quantities[i] !== 0) {
        totalError += Math.abs((quantities[i] - predicted) / quantities[i]) * 100;
      }
    }
    const mape = totalError / (quantities.length - 1);
    const accuracy = 100 - mape;

    console.log(`Item: ${key.replace(/_/g, " ")} | Qty: ${Math.round(predictedQty)} | Accuracy: ${accuracy.toFixed(2)}%`);

    results.push({
      item: key.replace(/_/g, " "),
      predictedQty: Math.round(predictedQty),
      accuracy: accuracy.toFixed(2),
    });
  }

  return results;
}

// Save output to a file
function savePredictions(predictions) {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const filename = `${date}.txt`;
  const filepath = path.join(outputFolder, filename);

  const header = "Item\tPredicted Quantity\tAccuracy (%)";
  const rows = predictions.map(p => `${p.item}\t${p.predictedQty}\t${p.accuracy}`);
  const content = [header, ...rows].join("\n");

  fs.writeFileSync(filepath, content);
  console.log(`Predictions saved: ${filepath}`);
}

// Main program + 
async function main() {
  console.log("Loading inventory data...");
  await loadInventoryData();

  console.log("Predicting inventory...");
  const predictions = predictInventory();

  console.log("Saving predictions...");
  savePredictions(predictions);

  console.log("Done!");
}

main();
