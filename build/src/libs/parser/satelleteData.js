"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rinexParser_1 = require("../../rinexParser");
const MESURES_IN_LINE = 5;
const LEN_OF_MESURE = 16;
class SatelliteData {
    constructor(index, data, linesForMesure, observeTypes) {
        let currentObservation = 0;
        for (let j = 0; j < linesForMesure; j++) {
            let mesureData = data[index + j];
            // Зная, что всего MESURES_IN_LINE измерений на строку
            for (let k = 0; k < MESURES_IN_LINE; k++) {
                if (currentObservation < observeTypes.length) {
                    // Получаем тип измерения (L,C,P,D,S)
                    let typeOfObserve = observeTypes[currentObservation];
                    let result = mesureData.substr(k * LEN_OF_MESURE, LEN_OF_MESURE);
                    // Если тип измерения - L, то к нему прилагается
                    // мощность сигнала, от 1 до 9 которую нужно обработать
                    if (typeOfObserve.substr(0, 1) === "L") {
                        let frequanceInfo = rinexParser_1.default.clearString(result.split(/\s+/g));
                        this[typeOfObserve] = parseFloat(frequanceInfo[0]);
                        this[typeOfObserve + "_power"] = parseInt(frequanceInfo[1]) || 0;
                    }
                    else
                        this[typeOfObserve] = parseFloat(result) || 0;
                    currentObservation++;
                }
                else
                    break;
            }
        }
    }
}
exports.default = SatelliteData;
