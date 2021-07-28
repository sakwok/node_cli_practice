const { fractionAddition } = require("../../src/math");

describe("Calculate final answer", () => {
  it("given two positive fractions", () => {
    const a = { numerator: 5, denominator: 10 };
    const b = { numerator: 5, denominator: 10 };

    expect(fractionAddition(a, b)).toStrictEqual({
      numerator: 100,
      denominator: 100,
    });
  });

  it("given a positive and a negative fraction", () => {
    const a = { numerator: 50, denominator: 10 };
    const b = { numerator: -5, denominator: 10 };

    expect(fractionAddition(a, b)).toStrictEqual({
      numerator: 450,
      denominator: 100,
    });

    const c = { numerator: 1, denominator: 2 };
    const d = { numerator: -5, denominator: 1 };

    expect(fractionAddition(c, d)).toStrictEqual({
      numerator: -9,
      denominator: 2,
    });
  });

  it("given a negative and a positive fraction", () => {
    const a = { numerator: -50, denominator: 10 };
    const b = { numerator: 5, denominator: 10 };

    expect(fractionAddition(a, b)).toStrictEqual({
      numerator: -450,
      denominator: 100,
    });
  });

  it("given two negative fraction", () => {
    const a = { numerator: -50, denominator: 10 };
    const b = { numerator: -50, denominator: 10 };

    expect(fractionAddition(a, b)).toStrictEqual({
      numerator: -1000,
      denominator: 100,
    });
  });
});
