import DecodedRinex from "./decodedRinex";
import setHeader from "./setHeader";
import parseMesures from "./parseMesuresOfType";

function convertRinex(data: string): DecodedRinex {
  let arrayOfLines = data.split("\n");
  let outputDecoded = new DecodedRinex();
  let hEnd = false;
  for (let i = 0; i < arrayOfLines.length; i++) {
    if (!hEnd) hEnd = setHeader(arrayOfLines[i], outputDecoded.header);
    else {
      let parsedOutputData = parseMesures(
        outputDecoded.header,
        i,
        arrayOfLines
      );
      if (outputDecoded.header.typeOfData === "obs") {
        outputDecoded.epoches = parsedOutputData;
        outputDecoded.epochesLength = parsedOutputData.length;
      } else if (
        outputDecoded.header.typeOfData === "gps" ||
        outputDecoded.header.typeOfData === "gln"
      ) {
        outputDecoded.satellites = parsedOutputData;
        outputDecoded.satellitesLength = parsedOutputData.length;
      } else {
        outputDecoded.data = parsedOutputData;
        outputDecoded.dataLength = parsedOutputData.length;
      }
      break;
    }
  }
  return outputDecoded;
}

export default convertRinex;
