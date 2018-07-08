"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Парсер для RINEX файлов
const clearString_1 = require("./libs/rinexStaticMethods/clearString");
const start_1 = require("./libs/rinexMethods/start");
const findBySettelite_1 = require("./libs/rinexStaticMethods/findBySettelite");
const mix_1 = require("./libs/rinexStaticMethods/mix");
const parsePow_1 = require("./libs/rinexStaticMethods/parsePow");
class Rinex {
    constructor(inputFileName, outputFileName) {
        this.inputFileName = inputFileName;
        this.outputFileName = outputFileName;
        this.start = start_1.default;
    }
}
Rinex.clearString = clearString_1.default;
Rinex.parsePow = parsePow_1.default;
Rinex.findBySettelite = findBySettelite_1.default;
Rinex.mix = mix_1.default;
exports.default = Rinex;
