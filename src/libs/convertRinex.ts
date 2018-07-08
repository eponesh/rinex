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
      switch (outputDecoded.header.typeOfData) {
        case "obs":
          outputDecoded.epoches = parsedOutputData;
          outputDecoded.epochesLength = parsedOutputData.length;
          break;
        case "gps":
        case "gln":
          outputDecoded.satellites = parsedOutputData;
          outputDecoded.satellitesLength = parsedOutputData.length;
          break;
        default:
          outputDecoded.data = parsedOutputData;
          outputDecoded.dataLength = parsedOutputData.length;
          break;
      }
      break;
    }
  }
  return outputDecoded;
}

export default convertRinex;
