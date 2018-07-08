"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(pref, satellite, epoches) {
    for (let i = 0; i < epoches.length; i++) {
        if (pref + epoches[i].satellite === satellite) {
            let epoch = epoches[i];
            delete epoch.satellite;
            return epoch;
        }
    }
    return {};
}
exports.default = default_1;
