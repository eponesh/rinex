import clearString from "../../src/libs/rinexStaticMethods/clearString";
import { assert } from "chai";

describe("Rinex.clearString method", () => {
  it("Удаление пустых строк в массиве", () => {
    assert.deepEqual(
      clearString([
        "",
        "2.11",
        "",
        "GLONASS NAVIGATION DATA",
        "RINEX VERSION / TYPE"
      ]),
      ["2.11", "GLONASS NAVIGATION DATA", "RINEX VERSION / TYPE"]
    );
  });
});
