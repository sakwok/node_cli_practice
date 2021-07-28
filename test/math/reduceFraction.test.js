const { reduceFraction } = require("../../src/math");

describe("Find current fraction given a denominator and numerator", () => {
  it("given denominator is 1 ", () => {
    const input = { numerator: 5, denominator: 1 };
    expect(reduceFraction(input)).toBe("5");
  });

  it("given numerator less than denominator", () => {
    const input = { numerator: 5, denominator: 7 };
    expect(reduceFraction(input)).toBe("5/7");
  });

  it("given numerator less than denominator and reducable", () => {
    const input = { numerator: 5, denominator: 10 };
    expect(reduceFraction(input)).toBe("1/2");
  });

  it("given denominator less than numerator", () => {
    const input = { numerator: 7, denominator: 5 };
    expect(reduceFraction(input)).toBe("1_2/5");
  });

  it("given denominator less than numerator and reducable", () => {
    const input = { numerator: 25, denominator: 10 };
    expect(reduceFraction(input)).toBe("2_1/2");
  });

  it("given denominator is number and numerator is 0 return 0", () => {
    const input = { numerator: 0, denominator: 10 };
    expect(reduceFraction(input)).toBe("0");
  });

  it("given negative numerator return negative value", () => {
    const input = { numerator: -5, denominator: 10 };
    expect(reduceFraction(input)).toBe("-1/2");
  });

  it("given negative numerator greater than denominator return negative value", () => {
    const input = { numerator: -11, denominator: 2 };
    expect(reduceFraction(input)).toBe("-5_1/2");
  });
});
