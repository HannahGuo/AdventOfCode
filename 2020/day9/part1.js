const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n").map((curLine) => parseInt(curLine));

let pastNumbers = fileData.slice(0, 25);

for(let i = 25; i < fileData.length; i++) {
    if(containsNumber(fileData[i])) {
        pastNumbers.push(fileData[i]);
        pastNumbers.shift();
    } else {
        console.log("found", fileData[i]);
        return;
    }
}

function containsNumber(num) {
    for(let i = 0; i < 25; i++) {
        if(pastNumbers.includes(num - pastNumbers[i])) {
            return true;
        }
    }

    return false;
}