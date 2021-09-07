const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let accumulator = 0;
let currentInstruction = {index: 0, command: fileData[0]};
let instructionsHistory = new Map();
let indexesChanged = [];

let curData = fileData;

fileData.forEach((val, index) => {
    if(val.includes("jmp") || val.indexOf("nop")) {
        indexesChanged.push(index);
    }
})

let curIndex = 0;

while(true) {
    while(!instructionsHistory.has(currentInstruction.index)) {
        let parseLine = currentInstruction.command.split(" ");
        let action = parseLine[0];
        let amount = parseInt(parseLine[1]);

        if(currentInstruction.index === curIndex) {
            if(action === "jmp") {
                action = "nop";
            } else if(action === "nop") {
                action = "jmp";
            }
        }

        instructionsHistory.set(currentInstruction.index, currentInstruction.command);
        
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
    
        currentInstruction.command = curData[currentInstruction.index] + " " + accumulator;
    }

    if(currentInstruction.index !== fileData.length) {
        curIndex++;
        currentInstruction = {index: 0, command: fileData[0]};
        instructionsHistory = new Map();    
        accumulator = 0;
    }  else {
        break;
    }
}

console.log({accumulator})
