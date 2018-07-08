const fs = require("fs");
import DecodedRinex from "../decodedRinex";
import convertRinex from "../convertRinex";

export default function() {
  return new Promise((resolve, reject) => {
    fs.readFile(this.inputFileName, "utf8", (err, data) => {
      if (err) throw err;
      let rinexData = convertRinex(data);
      this.header = rinexData.header;
      this.epoches = rinexData.epoches;
      this.satellites = rinexData.satellites;
      this.outputFileName
        ? fs.writeFile(
            this.outputFileName + ".json",
            JSON.stringify(rinexData),
            "utf8",
            err => {
              if (err) reject();
              resolve(rinexData);
            }
          )
        : resolve(rinexData);
    });
  });
}
