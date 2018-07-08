"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decodedRinex_1 = require("./decodedRinex");
const setHeader_1 = require("./setHeader");
const parseMesuresOfType_1 = require("./parseMesuresOfType");
function convertRinex(data) {
    let arrayOfLines = data.split("\n");
    let outputDecoded = new decodedRinex_1.default();
    let hEnd = false;
    for (let i = 0; i < arrayOfLines.length; i++) {
        if (!hEnd)
            hEnd = setHeader_1.default(arrayOfLines[i], outputDecoded.header);
        else {
            let parsedOutputData = parseMesuresOfType_1.default(outputDecoded.header, i, arrayOfLines);
            if (outputDecoded.header.typeOfData === "obs") {
                outputDecoded.epoches = parsedOutputData;
                outputDecoded.epochesLength = parsedOutputData.length;
            }
            else if (outputDecoded.header.typeOfData === "gps" ||
                outputDecoded.header.typeOfData === "gln") {
                outputDecoded.satellites = parsedOutputData;
                outputDecoded.satellitesLength = parsedOutputData.length;
            }
            else {
                outputDecoded.data = parsedOutputData;
                outputDecoded.dataLength = parsedOutputData.length;
            }
            break;
        }
    }
    return outputDecoded;
}
exports.default = convertRinex;
