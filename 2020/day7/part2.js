const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let rules = {};

function bagArray(rules) {
    const chunk = 3;
    let temp = [];
    for (let i = 1; i < rules.length; i += chunk + 1) {
        temp.push(rules.slice(i, i + chunk).join(" "));
    }

    return temp;
}

fileData.forEach((line) => {
    let lineContent = line.split(" ");
    let colourKey = lineContent.slice(0, 2).join(" ");
    let colourRule = bagArray(lineContent.slice(3));
    rules[colourKey] = colourRule;
})

// recursion!
let bagCount = 0;
rules["shiny gold"].forEach((sgKey) => {
    let parseKey = getKey(sgKey);
    let quant = getQuant(sgKey);
    bagCount += quant;

    bagHasShiny(parseKey, quant);
})

function bagHasShiny(currentBag, multiplier) {
    rules[currentBag].forEach((curValue) => {  
        if(curValue.includes("shiny gold") || curValue.includes("other")) {
            return;
        }

        bagCount += (getQuant(curValue) * multiplier);

        bagHasShiny(getKey(curValue), getQuant(curValue) * multiplier);
    });
}

function getKey(str) {
    return str.split(" ").slice(1, 3).join(" ");
}

function getQuant(str) {
    return parseInt(str.split(" ").slice(0, 1));
}

console.log(bagCount);