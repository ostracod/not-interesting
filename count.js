
var fs = require("fs");

function countLetters(text) {
    var letterCount = 0;
    var particularLetterCount = 0;
    text = text.toUpperCase();
    var index = 0;
    while (index < text.length) {
        var character = text.charCodeAt(index);
        if (character >= 65 && character <= 90) {
            letterCount += 1;
        }
        if (character == particularLetterCode) {
            particularLetterCount += 1;
        }
        index += 1;
    }
    return {
        letterCount: letterCount,
        particularLetterCount: particularLetterCount
    }
}

// Must be uppercase.
var particularLetter = "L";

console.log("Analyzing...");

var inputPath = "./book.txt"
var outputPath = "./output.csv"
var contents = fs.readFileSync(inputPath, "utf-8");
var lineList = contents.split("\n");
var particularLetterCode = particularLetter.charCodeAt(0);

var letterCount = 0;
var particularLetterCount = 0;
var chapterNumber = 0;
var chapterList = [];
var index = 0;
while (index < lineList.length) {
    var line = lineList[index];
    index += 1;
    if (line.indexOf("CHAPTER") >= 0 || index >= lineList.length) {
        if (chapterNumber >= 1) {
            chapterList.push({
                chapterNumber: chapterNumber,
                particularPercentage: particularLetterCount / letterCount * 100
            });
        }
        chapterNumber += 1;
        letterCount = 0;
        particularLetterCount = 0;
    } else {
        var result = countLetters(line);
        letterCount += result.letterCount;
        particularLetterCount += result.particularLetterCount;
    }
}

var lineList = ["Chapter Number,Letter " + particularLetter + " Percentage"];
var index = 0;
while (index < chapterList.length) {
    chapter = chapterList[index];
    lineList.push(chapter.chapterNumber + "," + chapter.particularPercentage);
    index += 1;
}

var contents = lineList.join("\n");
fs.writeFileSync(outputPath, contents);

console.log("Done.");
