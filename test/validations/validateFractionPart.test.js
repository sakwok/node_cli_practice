const { validateFractionPart } = require("../../src/validations");

describe("Find Current Expression", () => {
  it("returns true if digit", () => {
    const input = "1";
    expect(validateFractionPart(input)).toBe(true);
  });

  it("returns true if _", () => {
    const input = "_";
    expect(validateFractionPart(input)).toBe(true);
  });

  it("returns false if letter", () => {
    const input = "a";
    expect(validateFractionPart(input)).toBe(false);
  });

  it("returns false if operator ", () => {
    const input = "*";
    expect(validateFractionPart(input)).toBe(false);
  });

  it("returns false if /", () => {
    const input = "/";
    expect(validateFractionPart(input)).toBe(false);
  });

  it("returns false if other special characters &", () => {
    const input = "&";
    expect(validateFractionPart(input)).toBe(false);
  });
});
