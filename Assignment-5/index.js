const fs = require("fs");
const path = require("path");

function readFile(filePath, callback) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

function writeFile(filePath, data, callback) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null, "File written successfully");
  });
}

function logMessage(message, callback) {
  setTimeout(() => {
    console.log(message);
    callback(null, "Message logged");
  }, 1000);
}

const inputFilePath = path.join(__dirname, "text.txt");
const outputFilePath = path.join(__dirname, "output.txt");

function processFiles() {
  readFile(inputFilePath, (err, data) => {
    if (err) {
      return console.error("Error reading file:", err);
    }
    console.log("File data read successfully:", data);

    writeFile(outputFilePath, data, (err) => {
      if (err) {
        return console.error("Error writing file:", err);
      }
      console.log("File written successfully.");

      logMessage("Process completed successfully!", (err, message) => {
        if (err) {
          return console.error("Error logging message:", err);
        }
        console.log(message);
      });
    });
  });
}

processFiles();