const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5001;
const diskList = ['C:', 'D:', 'E:']
const modelsPath = `${diskList[0]}\\HELPI\\inventory\\app\\predictions\\models`;

app.use(cors());

app.get("/get-predictions", (req, res) => {
  fs.readdir(modelsPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error reading models directory" });
    }

    const latestFile = files
      .filter((file) => file.startsWith("predictions_") && file.endsWith(".txt"))
      .sort()
      .reverse()[0];

    if (!latestFile) {
      return res.status(404).json({ error: "No predictions file found" });
    }

    const filePath = path.join(modelsPath, latestFile);
    const predictions = [];

    fs.readFileSync(filePath, "utf-8")
      .split("\n")
      .slice(1) // Skip header row
      .forEach((line) => {
        const [name, predictedQty, accuracy] = line.split("\t");
        if (name && predictedQty && accuracy) {
          predictions.push({ name, predictedQty, accuracy });
        }
      });

    res.json(predictions);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://192.168.68.107:${PORT}`);
});
