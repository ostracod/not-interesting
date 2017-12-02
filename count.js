
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
while (true) {
    var line = lineList[index];
    var isLastLine = (index >= lineList.length - 1);
    var isChapterHeader = (line.indexOf("CHAPTER") >= 0);
    if (!isChapterHeader) {
        var result = countLetters(line);
        letterCount += result.letterCount;
        particularLetterCount += result.particularLetterCount;
    }
    if (isChapterHeader || isLastLine) {
        if (chapterNumber >= 1) {
            chapterList.push({
                chapterNumber: chapterNumber,
                particularPercentage: particularLetterCount / letterCount * 100
            });
        }
        chapterNumber += 1;
        letterCount = 0;
        particularLetterCount = 0;
    }
    if (isLastLine) {
        break;
    }
    index += 1;
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
