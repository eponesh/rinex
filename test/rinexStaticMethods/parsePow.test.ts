import parsePow from "../../src/libs/rinexStaticMethods/parsePow";
import { assert } from "chai";

describe("Rinex.parsePow method", () => {
  it("2E+02, должен вернуть 200", () => {
    assert.equal(parsePow("2E+02"), 200);
  });
  it("54.22E+03, должен вернуть 54220", () => {
    assert.equal(parsePow("54.22E+03"), 54220);
  });
  it("Пустая строка, должен вернуть 0", () => {
    assert.equal(parsePow(""), 0);
  });
  it("Ничего, должен вернуть 0", () => {
    assert.equal(parsePow(false), 0);
  });
});
