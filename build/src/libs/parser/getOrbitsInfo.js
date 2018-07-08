"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rinexParser_1 = require("../../rinexParser");
// Количество параметров орбиты, умещающихся в строке
const PARAMS_PER_LINE = 4;
const LEN_OF_PARAM = 19;
function default_1(i, sattelite, data, orbitsInfo) {
    // для каждой орбиты
    for (let j = 0; j < orbitsInfo.length; j++) {
        // Получаем параметры в виде массива
        let orbit = data[i + j].substr(3, 80);
        for (let k = 0; k < PARAMS_PER_LINE; k++)
            if (orbitsInfo[j][k])
                sattelite[orbitsInfo[j][k]] = rinexParser_1.default.parsePow(orbit.substr(k * LEN_OF_PARAM, LEN_OF_PARAM));
    }
}
exports.default = default_1;
