"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOrbitsInfo_1 = require("./getOrbitsInfo");
const rinexParser_1 = require("../../rinexParser");
// Параметры, собираемые с орбит спутника
const orbitsInfoGPS = [
    ["IODE", "Crs", "DeltaN", "M0"],
    ["Cuc", "Eccentricity", "Cus", "sqrtA"],
    ["Toe", "Cic", "OMEGA", "CIS"],
    ["i0", "Crc", "omega", "OMEGA_DOT"],
    ["IDOT", "L2", "gpsWeek", "L2flag"],
    ["SVaccuracy", "SVhealth", "TGD", "IODC"],
    ["transmissionTime", "fitInterval"]
];
module.exports = function (header, i, data) {
    // Массив спутников
    let satellites = [];
    // Пока не кончатся спутники
    while (i < data.length - 1) {
        // Строка данных
        let str = data[i];
        i++;
        // Строка данных о спутнике
        let strInfo = rinexParser_1.default.clearString(str.substr(0, 22).split(/\s+/g));
        // Строка данных о часах спутника
        let strClock = str.substr(22, 60);
        let satellite = {
            // Номер спутника
            satellite: strInfo[0],
            // Дата
            year: strInfo[1],
            month: strInfo[2],
            day: strInfo[3],
            hour: strInfo[4],
            min: strInfo[5],
            sec: strInfo[6],
            // Сдвиг часов спутника
            clockBias: rinexParser_1.default.parsePow(strClock.substr(0, 19)),
            // Скорость ухода часов спутника
            clockDrift: rinexParser_1.default.parsePow(strClock.substr(19, 19)),
            // Ускорение ухода часов спутника
            clockDriftRate: rinexParser_1.default.parsePow(strClock.substr(38, 19))
        };
        // Получение данных всех орбит
        getOrbitsInfo_1.default(i, satellite, data, orbitsInfoGPS);
        i += 7;
        // Добавляем эпоху в массив эпох
        satellites.push(satellite);
    }
    // Возвращаем обработанные эпохи
    return satellites;
};
//# sourceMappingURL=navigationDataofGPS.js.map