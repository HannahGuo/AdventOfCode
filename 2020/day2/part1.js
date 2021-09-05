const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let validCount = 0;

fileData.forEach((entry) => {
    let parsedValues = entry.split(" ");
    let [letterMin, letterMax] = parsedValues[0].split("-").map((val) => parseInt(val));
    let letterValid = parsedValues[1][0];
    let password = parsedValues[2];
    let currentLetterCount = 0;

    password.split("").forEach((value) => {
        if(value === letterValid) currentLetterCount++;
    })

    if(letterMin <= currentLetterCount && currentLetterCount <= letterMax){ 
        validCount++;
    }
})

console.log({validCount});