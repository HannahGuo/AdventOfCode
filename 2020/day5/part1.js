const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let highestSeatID = 0; 

function calculateID(row, column) {
    return (row * 8) + column;
}

fileData.forEach((seat) => {
    let startRangeRow = [...Array(128).keys()];
    let startRangeCol = [...Array(8).keys()];

    let rows = seat.split("").slice(0, 7);
    let columns = seat.split("").slice(-3);

    let finalValue = {column: -1, row: -1};

    rows.forEach((code) => {
        let halfway = Math.ceil(startRangeRow.length / 2);

        if(code === "F") {
            startRangeRow.splice(halfway, halfway);
        } else if(code === "B") {
            startRangeRow.splice(0, halfway);
        }
    });

    if(startRangeRow.length === 1) {
        finalValue.row = startRangeRow[0];
    } else {
        console.log("Error Row", startRangeRow)
    }

    columns.forEach((code) => {
        let halfway = Math.ceil(startRangeCol.length / 2);

        if(code === "L") {
            startRangeCol.splice(halfway, halfway);
        } else if(code === "R") {
            startRangeCol.splice(0, halfway);
        }
    })

    if(startRangeCol.length === 1) {
        finalValue.column = startRangeCol[0];
    } else {
        console.log("Error Col", startRangeCol, finalValue, seat);
    }

    let curId = calculateID(finalValue.row, finalValue.column);

    if(curId > highestSeatID) {
        highestSeatID = curId;
    }
})

console.log({highestSeatID})