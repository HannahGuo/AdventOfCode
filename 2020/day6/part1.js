const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n\n");

const fileData = fileContents.split("\n\n");

let groupData = [];
let curGroup = [];
let totalQuestions = 0;

// group passport data together
fileData.forEach((entry) => {
    if(entry === "") {
        groupData.push(curGroup);
        curGroup = [];
    } else {
        curGroup.push(entry);
    }
});
groupData.push(curGroup);

groupData.forEach((group) => {
    let checkQuestions = new Set();
    
    group.forEach((person) => {
        person.split("").forEach(checkQuestions.add, checkQuestions)
    })
   
    totalQuestions += checkQuestions.size;
})

console.log({totalQuestions})

