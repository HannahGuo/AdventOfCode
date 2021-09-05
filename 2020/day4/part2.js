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
    let isValid = true;

    passport.forEach((field) => {
        let fieldData = field.split(" ");

        fieldData.forEach((fieldEntry) => {
            let passportFieldData = fieldEntry.split(":");
            let passportField = passportFieldData[0];
            let fieldValue = passportFieldData[1];

            let year = parseInt(fieldValue);

            passportObj[passportField] = fieldValue;

            // validator
            switch(passportField) {
                case "byr":
                    if(!(fieldValue.length === 4 && (1920 <= year && year <= 2002))) {
                        isValid = false;
                    }
                    break;
                case "iyr":
                    if(!(fieldValue.length === 4 && (2010 <= year && year <= 2020))) {
                        isValid = false;
                    }
                    break;
                case "eyr":
                    if(!(fieldValue.length === 4 && (2020 <= year && year <= 2030))) {
                        isValid = false;
                    }
                    break;
                case "hgt":
                    let inches = fieldValue.split("in")[0];
                    let cm = fieldValue.split("cm")[0];

                    if(cm !== fieldValue) {
                        let cmValue = parseInt(cm);
                        if(!(150 <= cmValue && cmValue <= 193)) {
                            isValid = false;
                        }
                    } else if(inches !== fieldValue) {
                        let inValue = parseInt(inches);
                        if(!(59 <= inValue && inValue <= 76)) {
                            isValid = false;
                        }
                    } else {
                        isValid = false;
                    }
                    break;
                case "hcl":
                    // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
                    if(!(/^#[0-9A-F]{6}$/i.test(fieldValue))) {
                        isValid = false;
                    }
                    break;
                case "ecl":
                    const validEyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                    if(!(validEyes.includes(fieldValue))) {
                        isValid = false;
                    }
                    break;
                case "pid":
                    if(!(fieldValue.length === 9 && parseInt(fieldValue) !== NaN)) {
                        isValid = false;
                    }
                    break;
                case "cid":
                    break;
                default:
                    console.log("Invalid field:", passportField);
                    isValid = false;
            }
        });
    });

    // for this i'm assuming there aren't any invalid keys - which works for this problem
    // but i couldve done a more thorough check
    if(isValid && (Object.keys(passportObj).length === 8 || (Object.keys(passportObj).length === 7 && !("cid" in passportObj)))) {
        console.log({passportObj})
        validPassportCount++;
    }
});

console.log({validPassportCount})