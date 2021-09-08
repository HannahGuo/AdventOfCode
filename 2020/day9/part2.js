const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n").map((curLine) => parseInt(curLine));

let pastNumbers = fileData.slice(0, 25);
let errorNumber = -1;

for(let i = 25; i < fileData.length; i++) {
    if(containsNumber(fileData[i])) {
        pastNumbers.push(fileData[i]);
        pastNumbers.shift();
    } else {
        console.log("found", fileData[i]);
        errorNumber = fileData[i];
        break;
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


const addReducer = (previousValue, currentValue) => previousValue + currentValue;
let startingIndex = 0;
let endingIndex = 1;

// this while true loop only works because we know there is an answer
// i wouldnt use a while true loop otherwise
while(true) {
    let sumArr = fileData.slice(startingIndex, endingIndex);
    let sum = sumArr.reduce(addReducer);

    if(sum === errorNumber) {
        sumArr.sort((a, b) => a - b);
        console.log(sumArr[0] + sumArr[sumArr.length - 1]);
        return;
    } else if(sum < errorNumber) {
        endingIndex++;
    } else if(sum > errorNumber) {
        startingIndex++;
        endingIndex = startingIndex + 1;
    }
}