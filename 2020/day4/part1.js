const fs = require('fs');
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n\n");

const fileData = fileContents.split("\n\n");

let passportData = [];
let curPassport = [];
let validPassportCount = 0;

// group passport data together
fileData.forEach((entry) => {
    if(entry === "") {
        passportData.push(curPassport);
        curPassport = [];
    } else {
        curPassport.push(entry);
    }
})
passportData.push(curPassport)

passportData.forEach((passport) => {
    let passportObj = {};

    passport.forEach((field) => {
        let fieldData = field.split(" ");

        fieldData.forEach((fieldEntry) => {
            let passportFieldData = fieldEntry.split(":");
            passportObj[passportFieldData[0]] = passportFieldData[1];
        });
    });

    // for this i'm assuming there aren't any invalid keys - which works for this problem
    // but i couldve done a more thorough check
    if(Object.keys(passportObj).length === 8 || (Object.keys(passportObj).length === 7 && !("cid" in passportObj))) {
        validPassportCount++;
    }
});

console.log({validPassportCount})