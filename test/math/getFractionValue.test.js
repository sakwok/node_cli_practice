const { findGCD, getFractionValue } = require("../../src/math");

describe("Find current fraction given a number", () => {
  it("given whole number return total in fraction", () => {
    const input = "5";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: 5,
      denominator: 1,
    });
  });
  it("given 0 return total in fraction", () => {
    const input = "0";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: 0,
      denominator: 1,
    });
  });
  it("given 0/1 return total in fraction", () => {
    const input = "0";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: 0,
      denominator: 1,
    });
  });
  it("given fraction return total in fraction", () => {
    const input = "1/2";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: 1,
      denominator: 2,
    });
  });
  it("given whole number and fraction return total in fraction", () => {
    const input = "1_2/3";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: 5,
      denominator: 3,
    });
  });

  it("given negative whole number and fraction return total in fraction", () => {
    const input = "-1_2/3";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: -5,
      denominator: 3,
    });
  });

  it("given negative fraction return total in fraction", () => {
    const input = "-12/3";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: -12,
      denominator: 3,
    });
  });

  it("given negative whole number return total in fraction", () => {
    const input = "-12";
    expect(getFractionValue(input)).toStrictEqual({
      numerator: -12,
      denominator: 1,
    });
  });
});
