"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const satellite_1 = require("./satellite");
const ORBITS_GPS = 7;
const ORBITS_GLONASS = 7;
function default_1(header, i, data) {
    // Массив спутников
    let satellites = [];
    let totalOrbits = header.typeOfData === "gps" ? ORBITS_GPS : ORBITS_GLONASS;
    // Пока не кончатся спутники
    while (i < data.length - 1) {
        satellites.push(new satellite_1.default(i, data, header.typeOfData));
        i += totalOrbits + 1;
    }
    return satellites;
}
exports.default = default_1;
