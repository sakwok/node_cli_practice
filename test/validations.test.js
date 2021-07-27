const { validNumber, validOperator } = require("../src/validations");

describe("Valid numbers", () => {
  it("returns true if whole number", () => {
    expect(validNumber("21312321")).toBe(true);
  });

  it("returns true if fraction", () => {
    expect(validNumber("5/3")).toBe(true);
  });

  it("returns true if whole number with fraction", () => {
    expect(validNumber("53_5/3")).toBe(true);
  });

  it("returns false if contains non digits", () => {
    expect(validNumber("hello world")).toBe(false);
  });

  it("returns false if contains invalid fraction input", () => {
    expect(validNumber("32/")).toBe(false);
  });

  it("returns false if fraction with 0 as denominator", () => {
    expect(validNumber("32/0")).toBe(false);
  });

  it("returns false if contains whole number and invalid fraction input", () => {
    expect(validNumber("32_32/")).toBe(false);
  });

  it("returns false if contains whole number and fraction with 0 as denominator", () => {
    expect(validNumber("32_32/0")).toBe(false);
  });
});

describe("Valid operator", () => {
  it("returns true if *", () => {
    expect(validOperator("*")).toBe(true);
  });

  it("returns true if /", () => {
    expect(validOperator("/")).toBe(true);
  });

  it("returns true if +", () => {
    expect(validOperator("+")).toBe(true);
  });

  it("returns true if -", () => {
    expect(validOperator("-")).toBe(true);
  });

  it("returns false if any other string", () => {
    expect(validOperator("--")).toBe(false);
    expect(validOperator("-+*/")).toBe(false);
    expect(validOperator("-asdfdsf")).toBe(false);
    expect(validOperator("asdf+")).toBe(false);
    expect(validOperator("asfddsf")).toBe(false);
  });
});
