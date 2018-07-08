"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observationData_1 = require("./parser/observationData");
const navigationData_1 = require("./parser/navigationData");
function default_1(header, startIndex, data) {
    switch (header.typeOfData) {
        case "obs":
            return observationData_1.default(header, startIndex, data);
        case "gps":
        case "gln":
            return navigationData_1.default(header, startIndex, data);
    }
}
exports.default = default_1;
