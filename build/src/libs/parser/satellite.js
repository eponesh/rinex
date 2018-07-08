"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOrbitsInfo_1 = require("./getOrbitsInfo");
const rinexParser_1 = require("../../rinexParser");
// Параметры, собираемые с орбит спутника GPS
const orbitsInfoGPS = [
    ["IODE", "Crs", "DeltaN", "M0"],
    ["Cuc", "Eccentricity", "Cus", "sqrtA"],
    ["Toe", "Cic", "OMEGA", "CIS"],
    ["i0", "Crc", "omega", "OMEGA_DOT"],
    ["IDOT", "L2", "gpsWeek", "L2flag"],
    ["SVaccuracy", "SVhealth", "TGD", "IODC"],
    ["transmissionTime", "fitInterval"]
];
// Параметры, собираемые с орбит спутника GLONASS
const orbitsInfoGLONASS = [
    ["X", "velocityX", "accelerationX", "health"],
    ["Y", "velocityY", "accelerationY", "frequencyNumber"],
    ["Z", "velocityZ", "accelerationZ", "ageOfInformation"]
];
class Satellite {
    constructor(i, data, type) {
        // Строка данных информации об эпохе
        let stringOfInfo = data[i];
        // Номер спутника и время измерения
        let strInfoLeft = rinexParser_1.default.clearString(stringOfInfo.substr(0, 22).split(/\s+/g));
        // Уход часов, свдиг частоты, время сообщения
        let strInfoRight = stringOfInfo.substr(22, 60);
        this.satellite = parseInt(strInfoLeft[0]);
        this.year = parseInt(strInfoLeft[1]);
        this.month = parseInt(strInfoLeft[2]);
        this.day = parseInt(strInfoLeft[3]);
        this.hour = parseInt(strInfoLeft[4]);
        this.min = parseInt(strInfoLeft[5]);
        this.sec = parseFloat(strInfoLeft[6]);
        this.clockBias = rinexParser_1.default.parsePow(strInfoRight.substr(0, 19));
        i++;
        if (type === "gps") {
            this.clockDrift = rinexParser_1.default.parsePow(strInfoRight.substr(19, 19));
            this.clockDriftRate = rinexParser_1.default.parsePow(strInfoRight.substr(38, 19));
            getOrbitsInfo_1.default(i, this, data, orbitsInfoGPS);
        }
        else {
            this.frequencyBias = rinexParser_1.default.parsePow(strInfoRight.substr(19, 19));
            this.messageTime = rinexParser_1.default.parsePow(strInfoRight.substr(38, 19));
            getOrbitsInfo_1.default(i, this, data, orbitsInfoGLONASS);
        }
    }
}
exports.default = Satellite;
