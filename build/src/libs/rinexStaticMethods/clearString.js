"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(str) {
    let newStr = [];
    for (let i = 0; i < str.length; i++)
        if (str[i] !== "")
            newStr.push(str[i]);
    return newStr;
}
exports.default = default_1;
