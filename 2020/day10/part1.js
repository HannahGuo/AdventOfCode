const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n").map((curLine) => parseInt(curLine));

let sortedData = fileData.sort((a, b) => a - b);

sortedData.unshift(0);

let differences = new Map();
differences.set(1, 0);
differences.set(2, 0);
differences.set(3, 1); // default end difference

for(let i = 0; i < sortedData.length - 1; i++) {
    let diff = (sortedData[i + 1] - sortedData[i]);
    differences.set(diff, differences.get(diff) + 1);
}

console.log(differences, differences.get(1) * differences.get(3));