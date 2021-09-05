const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

const slopesToTraverse = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2},
];

let treeCounts = 1;

slopesToTraverse.forEach((slope) => {
    let treeCount = 0;
    let currentPosition = {x: 0, y: 0};

    for(let i = 0; i < fileData.length; i += slope.y) {
        let curLine = fileData[i];
        let positionForCalc = currentPosition.x;
    
        // if the given line is not long enough, we can use modulus to get where the position *would* be
        if(curLine.length <= positionForCalc) {
            positionForCalc = (positionForCalc % curLine.length);
        }
    
        if(curLine[positionForCalc] === "#") {
            treeCount++;
        }
    
        currentPosition.x += slope.x;
        currentPosition.y += slope.y;
    }

    treeCounts *= treeCount;
})

console.log({treeCounts})