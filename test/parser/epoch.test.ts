import { dataOBSERVE, typesOfObserve } from "./dataOBSERVE";
import { assert } from "chai";
import Epoch from "../../src/libs/parser/epoch";

const MESURES_PER_LINE = 5;
const SAT_PER_LINE = 12;

describe("Epoch", () => {
  let index = 0;
  let epoch: Epoch;
  let expectedEpoch = {
    date: {
      day: 27,
      hour: 0,
      minute: 0,
      month: 6,
      sec: 0,
      year: 18
    },
    satellites: ["R15", "R05"],
    satellitesCount: 2,
    satellitesData: [
      {
        C1: 20727114.987,
        C2: 20727122.505,
        C5: 0,
        D1: 2725.864,
        D2: 2120.128,
        D5: 0,
        L1: 110759464.885,
        L1_power: 8,
        L2: 86146256.659,
        L2_power: 6,
        L5: 0,
        L5_power: 0,
        P1: 20727114.81,
        P2: 20727122.439,
        S1: 49.0,
        S2: 38.0,
        S5: 0
      },
      {
        C1: 20506679.806,
        C2: 20506683.61,
        C5: 0,
        D1: 1517.475,
        D2: 1180.215,
        D5: 0,
        L1: 109619977.401,
        L1_power: 7,
        L2: 85259986.855,
        L2_power: 5,
        L5: 0,
        L5_power: 0,
        P1: 20506679.746,
        P2: 20506684.443,
        S1: 47.0,
        S2: 32.0,
        S5: 0
      }
    ]
  };
  const linesForMesure = Math.ceil(typesOfObserve.length / MESURES_PER_LINE);
  const satCount = parseInt(dataOBSERVE[index].substr(30, 2));
  const linesForSat = Math.ceil(satCount / SAT_PER_LINE);
  it("Инициализация класса Эпохи наблюдений", () => {
    epoch = new Epoch(
      0,
      dataOBSERVE,
      typesOfObserve,
      linesForMesure,
      satCount,
      linesForSat,
      SAT_PER_LINE
    );
    assert.deepEqual(epoch, expectedEpoch);
  });
});
