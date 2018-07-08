import { assert } from "chai";
import Satellite from "../../src/libs/parser/satellite";
import dataGPS from "./dataGPS";
import dataGLONASS from "./dataGLONASS";
import {
  expectedClassGPS,
  expectedClassGLONASS
} from "./expectedSatelliteClasses";

describe("Sattelite", () => {
  let sat: Satellite;
  it("Инициализация класса для GPS", () => {
    sat = new Satellite(0, dataGPS, "gps");
    assert.deepEqual(sat, expectedClassGPS);
  });
  it("Инициализация класса для GLONASS", () => {
    sat = new Satellite(0, dataGLONASS, "gln");
    assert.deepEqual(sat, expectedClassGLONASS);
  });
});
