const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

const fileData = fileContents.split("\n");

let rules = {};
let bagCount = new Set();

function bagArray(rules) {
    const chunk = 2;
    let temp = [];
    for (let i = 1; i < rules.length; i += chunk + 2) {
        temp.push(rules.slice(i, i + chunk).join(" "));
    }

    return temp;
}

fileData.forEach((line) => {
    let lineContent = line.split(" ");
    let colourKey = lineContent.slice(0, 2).join(" ");
    let colourRule = bagArray(lineContent.slice(4));

    rules[colourKey] = colourRule;
})

// recursion!
for(const key in rules) {
    let hasBag = false;

    bagHasShiny(key);

    if(hasBag) {
        bagCount.add(key);
    }

    function bagHasShiny(currentBag) {
        rules[currentBag].forEach((curValue) => {  

            if(curValue.includes("shiny gold")) {
                hasBag = true;
                return;
            } else if(curValue.includes("other")) {
                return;
            }
    
            bagHasShiny(curValue);
        });
    }
}

console.log(bagCount.size);