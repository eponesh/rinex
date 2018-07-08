import setHeader from "../src/libs/setHeader";
import { assert } from "chai";
import DecodedRinexHeader from "../src/libs/decodedRinexHeader";
import headerObservation from "./headerStubs/headerObservation";
import headerGPS from "./headerStubs/headerGPS";
import headerGLONASS from "./headerStubs/headerGLONASS";

describe("setHeader method", () => {
  describe("Чтение заголовка файла Observation", () => {
    let header = new DecodedRinexHeader();
    for (let i = 0; i < headerObservation.length; i++)
      setHeader(headerObservation[i], header);
    it("Версия, ожидается 2.11", () => {
      assert.equal(header.ver, 2.11);
    });
    it("Тип наблюдений, ожидается obs", () => {
      assert.equal(header.typeOfData, "obs");
    });
    it("Положение станции, ожидается (452260.6174, 3635872.0696, 5203456.6948)", () => {
      assert.deepEqual(header.approxPosition, {
        X: 452260.6174,
        Y: 3635872.0696,
        Z: 5203456.6948
      });
    });
    it("Список измерений, ожидается L1, L2, L5, C1, C2, P1, P2, C5, D1, D2, D5, S1, S2, S5", () => {
      assert.deepEqual(header.observeTypes, [
        "L1",
        "L2",
        "L5",
        "C1",
        "C2",
        "P1",
        "P2",
        "C5",
        "D1",
        "D2",
        "D5",
        "S1",
        "S2",
        "S5"
      ]);
    });
    it("Волновые множители, ожидается 1, 1", () => {
      assert.deepEqual(header.wavelengthFact, {
        L1: 1,
        L2: 1
      });
    });
    it("Интервал измерений, ожидается 30 сек.", () => {
      assert.equal(header.interval, 30);
    });
  });

  describe("Чтение заголовка файла Navigation GPS", () => {
    let header = new DecodedRinexHeader();
    for (let i = 0; i < headerGPS.length; i++) setHeader(headerGPS[i], header);
    it("Версия, ожидается 2.11", () => {
      assert.equal(header.ver, 2.11);
    });
    it("Тип наблюдений, ожидается gps", () => {
      assert.equal(header.typeOfData, "gps");
    });
    it("Ионосферная задержка (alpha), ожидается (4.6566E-09, 1.4901E-08, -5.9605E-08, -1.1921E-07)", () => {
      assert.deepEqual(header.ionAlpha, [
        4.6566e-9,
        1.4901e-8,
        -5.9605e-8,
        -1.1921e-7
      ]);
    });
    it("Ионосферная задержка (beta), ожидается (8.1920E+04, 9.8304E+04, -6.5536E+04, -5.2429E+05)", () => {
      assert.deepEqual(header.ionBeta, [
        8.192e4,
        9.8304e4,
        -6.5536e4,
        -5.2429e5
      ]);
    });
    it("Уход часов, ожидается 18", () => {
      assert.equal(header.leapSeconds, 18);
    });
  });

  describe("Чтение заголовка файла Navigation GLONASS", () => {
    let header = new DecodedRinexHeader();
    for (let i = 0; i < headerGLONASS.length; i++)
      setHeader(headerGLONASS[i], header);

    it("Версия, ожидается 2.11", () => {
      assert.equal(header.ver, 2.11);
    });
    it("Тип наблюдений, ожидается gln", () => {
      assert.equal(header.typeOfData, "gln");
    });
    it("Уход часов, ожидается 18", () => {
      assert.equal(header.leapSeconds, 18);
    });
  });
});
