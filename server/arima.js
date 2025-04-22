const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const ARIMA = require("arima");

// Paths
const inputFolder = "C:\\Helpi\\inventory\\app\\predictions\\files";
const outputFolder = "C:\\Helpi\\inventory\\app\\predictions\\models";

// Data store
let inventoryData = {};
// Parse all .txt files and populate inventoryData
function loadInventoryData() {
  return new Promise((resolve) => {
    const files = fs.readdirSync(inputFolder).filter(f => f.endsWith(".txt"));
    let processedFiles = 0;

    files.forEach((file) => {
      fs.createReadStream(path.join(inputFolder, file))
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
          const qty = parseInt(row.Qty, 10);
          const date = new Date(row.LastCheckedDate);
          const month = date.getMonth() + 1;
          const key = `${row.Name}_${row.Size}`;

          if (!isNaN(qty)) {
            if (!inventoryData[key]) {
              inventoryData[key] = { months: [], quantities: [] };
            }
            inventoryData[key].months.push(month);
            inventoryData[key].quantities.push(qty);
          }
        })
        .on("end", () => {
          processedFiles++;
          if (processedFiles === files.length) {
            resolve();
          }
        });
    });

    if (files.length === 0) resolve();
  });
}

// Predict next month's inventory and return results
function generatePredictions() {
  const results = [];
  const nextMonth = new Date().getMonth() + 2;

  console.log("\nInventory Predictions:\n");

  for (const key in inventoryData) {
    const { quantities } = inventoryData[key];

    if (quantities.length < 3) {
      console.log(`Item: ${key.replace(/_/g, " ")} | Not enough data`);
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

// Save predictions to .txt file
function savePredictions(predictions) {
  const today = new Date();
  const fileName = `predictions_${today.toISOString().slice(0, 10).replace(/-/g, ".")}.txt`;
  const filePath = path.join(outputFolder, fileName);

  const header = "Item\tPredicted Quantity\tAccuracy (%)";
  const rows = predictions.map(p => `${p.item}\t${p.predictedQty}\t${p.accuracy}`);
  const content = [header, ...rows].join("\n");

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`\nPredictions saved to: ${filePath}`);
}

// Main function
async function main() {
  console.log("Starting Inventory Prediction...");
  await loadInventoryData();
  const predictions = generatePredictions();
  savePredictions(predictions);
  console.log("Done.\n");
}

main();
