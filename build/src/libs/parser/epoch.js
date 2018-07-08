"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rinexParser_1 = require("../../rinexParser");
const satelleteData_1 = require("./satelleteData");
const SAT_NAME_LEN = 3;
function getSatellites(data, currentIndex, linesForSat, satPerLine) {
    let satellites = [];
    // Зная, что всего satPerLine спутников на строку
    // Проходим строку, отбирая SAT_NAME_LEN символов под спутник
    for (let j = 0; j < linesForSat; j++)
        for (let k = 0; k < satPerLine; k++)
            satellites.push(data[currentIndex + j]
                .substr(32, 50)
                .substr(k * SAT_NAME_LEN, SAT_NAME_LEN));
    // Добавляем спутник в массив спутников
    return rinexParser_1.default.clearString(satellites);
}
class Epoch {
    constructor(i, data, observeTypes, linesForMesure, satCount, linesForSat, satPerLine) {
        this.satellitesData = [];
        let str = data[i];
        let currentIndex = i;
        let time = rinexParser_1.default.clearString(str.substr(0, 32).split(/\s+/g));
        this.date = {
            year: parseInt(time[0]),
            month: parseInt(time[1]),
            day: parseInt(time[2]),
            hour: parseInt(time[3]),
            minute: parseInt(time[4]),
            sec: parseFloat(time[5])
        };
        this.satellites = getSatellites(data, currentIndex, linesForSat, satPerLine);
        currentIndex += linesForSat;
        for (let s = 0; s < satCount; s++) {
            this.satellitesData.push(new satelleteData_1.default(currentIndex, data, linesForMesure, observeTypes));
            currentIndex += linesForMesure;
        }
        this.satellitesCount = satCount;
    }
}
exports.default = Epoch;
