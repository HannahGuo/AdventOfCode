const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, " ");

const fileData = fileContents.split(" ");

// could use a js map but i know object syntax better, less likely to mess it up on an interview
// map that goes {difference: firstValue}
let solutionMap = {};
const requiredSum = 2020;

// could also be done in O(n^2)
fileData.map((entry) => {
    let numberVal = parseInt(entry);

    if(entry in solutionMap) {
        console.log(entry * solutionMap[entry]);
    } else {
        solutionMap[(requiredSum - numberVal)] = entry;
    }
})