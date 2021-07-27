const { findClosingParens, findExpression, parse } = require("../src/parse");

describe("Find Closing Parentheses", () => {
  it("returns the values between parentheses and index after ending parens", () => {
    const str = "(21312321) * 3";
    expect(findClosingParens(0, str)).toStrictEqual({
      value: "21312321",
      index: 10,
    });
  });

  it("if no closing parens return -1 for index", () => {
    const str = "(21312321";
    expect(findClosingParens(0, str)).toStrictEqual({
      value: "21312321",
      index: -1,
    });
  });

  it("if multiple parens return the most outer parens", () => {
    const str = "(((10) * (20)) + 5)";
    expect(findClosingParens(0, str)).toStrictEqual({
      value: "((10) * (20)) + 5",
      index: str.length,
    });
  });
});

describe("Find Current Expression", () => {
  it("returns the current expression until space", () => {
    const str = "123456789 * 3";
    expect(findExpression(0, str)).toStrictEqual({
      value: "123456789",
      index: 9,
    });
  });

  it("returns the current expression until parens and returns multiply operand", () => {
    const str = "123456789(3)";
    expect(findExpression(0, str)).toStrictEqual({
      value: "123456789",
      index: 9,
    });
  });

  it("returns the current expression until end of string", () => {
    const str = "1 * 123456789";
    expect(findExpression(4, str)).toStrictEqual({
      value: "123456789",
      index: str.length,
    });
  });
});

describe("Parses expression into individual items", () => {
  it("returns the individual items when expression has no parens", () => {
    const str = "123456789 * 3";
    expect(parse(str)).toStrictEqual([
      {
        value: "123456789",
      },
      {
        value: "*",
      },
      {
        value: "3",
      },
    ]);
  });

  it("returns the individual items when expression has no parens", () => {
    const str = "123456789(3)";
    expect(parse(str)).toStrictEqual([
      {
        value: "123456789",
      },
      {
        value: "*",
      },
      {
        type: "parensExpression",
        value: "3",
      },
    ]);
  });

  //   it("returns the current expression until parens and returns multiply operand", () => {
  //     const str = "123456789(3)";
  //     expect(findExpression(0, str)).toStrictEqual({
  //       value: "123456789",
  //       index: 9,
  //       operand: "*",
  //     });
  //   });

  //   it("returns the current expression until end of string", () => {
  //     const str = "1 * 123456789";
  //     expect(findExpression(4, str)).toStrictEqual({
  //       value: "123456789",
  //       index: str.length,
  //     });
  //   });
});
