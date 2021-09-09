// this problem is incomplete because it requires some more thinking 
// will revist

// const fs = require('fs');
// const path = require("path");

// const fileContents = fs.readFileSync(path.resolve(__dirname, 'data.txt'), "utf8").replace(/(\r\n|\n|\r)/gm, "\n");

// const fileData = fileContents.split("\n").map((curLine) => parseInt(curLine));

// let sortedData = fileData.sort((a, b) => a - b);

// sortedData.unshift(0);
// sortedData.push(sortedData[sortedData.length - 1] + 3);

// let currentStep = 1;
// let multiplier = 1;

// for(let i = 0; i < sortedData.length; i += currentStep) {
//     let diff = (sortedData[i + 1] - sortedData[i]);
//     let secondDiff = (sortedData[i + 2] - sortedData[i]);
//     let thirdDiff = (sortedData[i + 3] - sortedData[i]);

//     console.log(sortedData[i], {i, diff, secondDiff, thirdDiff});

//     if(diff === 1) {
//         if(secondDiff === 2) {
//             if(thirdDiff === 3) {
//                 multiplier *= 3;
//             } else {
//                 multiplier *= 2;
//             }
//         }
//     } else if(diff === 2 && secondDiff === 3) {
//         multiplier *= 2;
//     }
// }


// console.log(multiplier);