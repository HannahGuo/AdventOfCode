const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let validCount = 0;

fileData.forEach((entry) => {
    let parsedValues = entry.split(" ");
    let [indexOne, indexTwo] = parsedValues[0].split("-").map((val) => parseInt(val) - 1); // subtract one to convert to zero-based
    let letterValid = parsedValues[1][0];
    let password = parsedValues[2];

    if((password[indexOne] === letterValid && password[indexTwo] !== letterValid) || 
        (password[indexOne] !== letterValid && password[indexTwo] === letterValid)){ 
        validCount++;
    }
})

console.log({validCount});