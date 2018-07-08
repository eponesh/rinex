"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const convertRinex_1 = require("../convertRinex");
function default_1() {
    return new Promise((resolve, reject) => {
        fs.readFile(this.inputFileName, "utf8", (err, data) => {
            if (err)
                throw err;
            let rinexData = convertRinex_1.default(data);
            this.header = rinexData.header;
            this.epoches = rinexData.epoches;
            this.satellites = rinexData.satellites;
            this.outputFileName
                ? fs.writeFile(this.outputFileName + ".json", JSON.stringify(rinexData), "utf8", err => {
                    if (err)
                        reject();
                    resolve(rinexData);
                })
                : resolve(rinexData);
        });
    });
}
exports.default = default_1;
