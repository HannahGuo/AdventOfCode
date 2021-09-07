const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let accumulator = 0;
let currentInstruction = {index: 0, command: fileData[0]};
let instructionsHistory = new Map();

while(!instructionsHistory.has(currentInstruction.index)) {
    instructionsHistory.set(currentInstruction.index, currentInstruction.command);

    let parseLine = currentInstruction.command.split(" ");
    let action = parseLine[0];
    let amount = parseInt(parseLine[1]);

    switch(action) {
        case "acc":
            accumulator += amount;
            currentInstruction.index++;
            break;
        case "jmp":
            currentInstruction.index += amount;
            break;
        case "nop":
            currentInstruction.index++;
        default:
            break;
    }

    currentInstruction.command = fileData[currentInstruction.index] + " " + accumulator;
}

console.log({accumulator})
