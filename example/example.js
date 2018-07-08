const Rinex = require("../build/src/rinexParser").default;
let fileIn = "example/input/novt1780.18";
let fileOut = "example/output/novt1780.18";
let satellitesOutputPath = "example/output/novt1780/";

let observation = new Rinex(fileIn + "O", fileOut + "O");
let gps = new Rinex(fileIn + "N", fileOut + "N");
let glonass = new Rinex(fileIn + "G", fileOut + "G");

observation.start();
gps.start();
glonass.start();
