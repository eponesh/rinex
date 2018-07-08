"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decodedRinexHeader_1 = require("./decodedRinexHeader");
class DecodedRinex {
    constructor() {
        this.header = new decodedRinexHeader_1.default();
    }
}
exports.default = DecodedRinex;
