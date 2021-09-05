const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

const xMovement = 3;
const yMovement = 1;

let currentPosition = {x: 0, y: 0};
let treeCount = 0;

fileData.forEach((curLine) => {
    let positionForCalc = currentPosition.x;

    // if the given line is not long enough, we can use modulus to get where the position *would* be
    if(curLine.length <= positionForCalc) {
        positionForCalc = (positionForCalc % curLine.length);
    }

    if(curLine[positionForCalc] === "#") {
        treeCount++;
    }

    currentPosition.y += yMovement;
    currentPosition.x += xMovement;
})

console.log({treeCount})