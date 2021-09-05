const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, " ");

const fileData = fileContents.split(" ").map((item) => parseInt(item));

// could use a js map but i know object syntax better, less likely to mess it up on an interview
const requiredSum = 2020;

// O(n^3) solution... not the greatest, but it does get the answer.

for(let i = 0; i < fileData.length; i++) {
    for(let j = 0; j < fileData.length; j++) {
        for(let k = 0; k < fileData.length; k++) {
            if(fileData[i] + fileData[j] + fileData[k] === requiredSum) {
                console.log(fileData[i] * fileData[j] * fileData[k]);
                return;
            }
        }
    }
}