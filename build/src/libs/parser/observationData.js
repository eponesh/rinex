"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const epoch_1 = require("./epoch");
const MESURES_PER_LINE = 5;
const SAT_PER_LINE = 12;
function default_1(header, i, data) {
    const observeTypes = header.observeTypes;
    const linesForMesure = Math.ceil(header.observeTypes.length / MESURES_PER_LINE);
    let epoches = [];
    // Пока не кончатся эпохи
    while (i < data.length - 1) {
        const satCount = parseInt(data[i].substr(30, 2));
        const linesForSat = Math.ceil(satCount / SAT_PER_LINE);
        epoches.push(new epoch_1.default(i, data, header.observeTypes, linesForMesure, satCount, linesForSat, SAT_PER_LINE));
        i += linesForSat + satCount * linesForMesure;
    }
    return epoches;
}
exports.default = default_1;
