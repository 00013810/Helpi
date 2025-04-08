const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const ARIMA = require("arima");

// Disk list and folder paths
const diskList = ['C:', 'D:', 'E:'];
const inputFolderPath = `${diskList[0]}\\Helpi\\inventory\\app\\predictions\\files`;
const outputFolderPath = `${diskList[0]}\\Helpi\\inventory\\app\\predictions\\models`;

let inventoryData = {};

// Ensure the output directory exists
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath, { recursive: true });
  console.log(`Created folder: ${outputFolderPath}`);
}

// Read all .txt files in the input folder
fs.readdirSync(inputFolderPath).forEach((file) => {
  if (path.extname(file) === ".txt") {
    const filePath = path.join(inputFolderPath, file);
    fs.createReadStream(filePath)
      .pipe(csv({ separator: "\t" })) // Adjust separator based on file format
      .on("data", (row) => {
        const date = new Date(row.LastCheckedDate);
        const month = date.getMonth() + 1;
        const qty = parseInt(row.Qty, 10);
        if (!isNaN(qty)) {
          // Grouping only by Name and Size (without OfficeName)
          const key = `${row.Name}_${row.Size}`;
          if (!inventoryData[key]) {
            inventoryData[key] = { months: [], quantities: [] };
          }
          inventoryData[key].months.push(month);
          inventoryData[key].quantities.push(qty);
        }
      })
      .on("end", () => {
        console.log(`Finished processing ${file}`);
      });
  }
});

// Wait for all files to be processed before making predictions
setTimeout(() => {
  console.log("\nPredicted Inventory for Next Month:\n");
  const nextMonth = new Date().getMonth() + 2;

  // Prepare an array to store prediction results for saving to a file
  const predictionsToSave = [];

  Object.keys(inventoryData).forEach((key) => {
    const { months, quantities } = inventoryData[key];

    if (quantities.length < 3) { // ARIMA requires at least 3 data points
      console.log(`Item: ${key.replace(/_/g, " ")} | Not enough data for prediction`);
      return;
    }

    // Train an ARIMA model
    const arima = new ARIMA({ p: 2, d: 1, q: 2, verbose: false }).train(quantities);

    // Predict for next month
    const [prediction] = arima.predict(1);

    // Calculate Mean Absolute Percentage Error (MAPE)
    let totalPercentageError = 0;
    quantities.forEach((actual, index) => {
      if (index < quantities.length - 1) { // Avoid last value since it's used for prediction
        const predicted = arima.predict(1)[0];
        if (actual !== 0) {
          totalPercentageError += Math.abs((actual - predicted) / actual) * 100;
        }
      }
    });

    const mape = totalPercentageError / (quantities.length - 1);
    const accuracy = 100 - mape;

    // Display results
    console.log(
      `Item: ${key.replace(/_/g, " ")} | Predicted Qty: ${Math.round(prediction)} | Accuracy: ${accuracy.toFixed(2)}%`
    );

    // Add prediction to the array for saving
    predictionsToSave.push({
      item: key.replace(/_/g, " "),
      predictedQty: Math.round(prediction),
      accuracy: accuracy.toFixed(2),
    });
  });

  console.log("\nPrediction complete.");

  // Save predictions to a .txt file
  savePredictionsToFile(predictionsToSave);
}, 5000); // Adjust timeout based on file processing time

// Function to save predictions to a .txt file
function savePredictionsToFile(predictions) {
  // Generate the file name with the current date
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const fileName = `predictions_${day}.${month}.${year}.txt`;
  const filePath = path.join(outputFolderPath, fileName);

  // Prepare the content of the file
  const header = ["Item", "Predicted Quantity", "Accuracy (%)"].join("\t");
  const rows = predictions.map((prediction) => [
    prediction.item,
    prediction.predictedQty,
    prediction.accuracy,
  ].join("\t"));

  const fileContent = [header, ...rows].join("\n");

  // Write the content to the file
  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`Predictions saved to file: ${filePath}`);
}
