const {
  createCurrentExpressionItemList,
  findExpression,
  validate,
  validateExpressionItemList,
  validateNumber,
  validateOperator,
  validateParens,
} = require("../../src/validations");

const { validatedItemTypes } = require("../../src/constants");
const { openParens, operator, invalid, closeParens, operand } =
  validatedItemTypes;

describe("Find Current Expression", () => {
  it("returns the current expression until space", () => {
    const str = "123456789 * 3";
    expect(findExpression(0, str)).toStrictEqual({
      value: "123456789",
      index: 9,
    });
  });

  it("returns the invalid current expression until close parens", () => {
    const str = "123456789(3)";
    expect(findExpression(0, str)).toStrictEqual({
      value: "123456789(3",
      index: 11,
    });
  });

  it("returns the current expression until close parens", () => {
    const str = "(123456789) (3)";
    expect(findExpression(1, str)).toStrictEqual({
      value: "123456789",
      index: 10,
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

describe("Separates out a mathematical expression into individual parts", () => {
  it("returns the current expression with no fractions / parens separated ", () => {
    const str = "123456789 * 3";
    expect(createCurrentExpressionItemList(str)).toStrictEqual([
      { type: operand, index: 0 },
      { type: operator, index: 10 },
      { type: operand, index: 12 },
    ]);
  });

  it("returns the current expression with parens and no fractions separated", () => {
    const str = "(123456789) * 3";
    expect(createCurrentExpressionItemList(str)).toStrictEqual([
      { type: openParens, index: 0 },
      { type: operand, index: 1 },
      { type: closeParens, index: 10 },
      { type: operator, index: 12 },
      { type: operand, index: 14 },
    ]);
  });

  it("returns the current expression with parens and fractions separated", () => {
    const str = "1_2/3 * 3_4/5 / 6 + 8 - (7)";
    expect(createCurrentExpressionItemList(str)).toStrictEqual([
      { type: operand, index: 0 },
      { type: operator, index: 6 },
      { type: operand, index: 8 },
      { type: operator, index: 14 },
      { type: operand, index: 16 },
      { type: operator, index: 18 },
      { type: operand, index: 20 },
      { type: operator, index: 22 },
      { type: openParens, index: 24 },
      { type: operand, index: 25 },
      { type: closeParens, index: 26 },
    ]);
  });

  it("returns the current expression with parens and fractions separated", () => {
    const str = "(123456789_32/4)(3_2/4)";
    expect(createCurrentExpressionItemList(str)).toStrictEqual([
      { type: openParens, index: 0 },
      { type: operand, index: 1 },
      { type: closeParens, index: 15 },
      { type: openParens, index: 16 },
      { type: operand, index: 17 },
      { type: closeParens, index: 22 },
    ]);
  });

  it("returns invalid if a expression is not parens, valid number, or valid operand", () => {
    const invalidOperatorEx = "123 & 4";
    expect(createCurrentExpressionItemList(invalidOperatorEx)).toStrictEqual([
      { type: operand, index: 0 },
      { type: invalid, index: 4 },
      { type: operand, index: 6 },
    ]);

    const invalidOperatorEx2 = "123* 4";
    expect(createCurrentExpressionItemList(invalidOperatorEx2)).toStrictEqual([
      { type: invalid, index: 0 },
      { type: operand, index: 5 },
    ]);

    const invalidOperatorEx3 = "(123)* 4";
    expect(createCurrentExpressionItemList(invalidOperatorEx3)).toStrictEqual([
      { type: openParens, index: 0 },
      { type: operand, index: 1 },
      { type: closeParens, index: 4 },
      { type: operator, index: 5 },
      { type: operand, index: 7 },
    ]);

    const invalidOperatorEx4 = "(123) *4";
    expect(createCurrentExpressionItemList(invalidOperatorEx4)).toStrictEqual([
      { type: openParens, index: 0 },
      { type: operand, index: 1 },
      { type: closeParens, index: 4 },
      { type: invalid, index: 6 },
    ]);

    const invalidOperatorEx5 = "* * *";
    expect(createCurrentExpressionItemList(invalidOperatorEx5)).toStrictEqual([
      { type: operator, index: 0 },
      { type: operator, index: 2 },
      { type: operator, index: 4 },
    ]);

    const invalidOperandEx1 = "123_ + 4";
    expect(createCurrentExpressionItemList(invalidOperandEx1)).toStrictEqual([
      { type: invalid, index: 0 },
      { type: operator, index: 5 },
      { type: operand, index: 7 },
    ]);

    const invalidOperandEx2 = "123_3/0 + 4";
    expect(createCurrentExpressionItemList(invalidOperandEx2)).toStrictEqual([
      { type: invalid, index: 0 },
      { type: operator, index: 8 },
      { type: operand, index: 10 },
    ]);
  });
});

describe("Valid numbers", () => {
  it("returns true if whole number", () => {
    expect(validateNumber("21312321")).toBe(true);
  });

  it("returns true if negative whole number", () => {
    expect(validateNumber("-21312321")).toBe(true);
  });

  it("returns true if negative whole single number", () => {
    expect(validateNumber("-5")).toBe(true);
  });

  it("returns true if negative fraction", () => {
    expect(validateNumber("-2131/32")).toBe(true);
  });

  it("returns true if negative whole number and fraction", () => {
    expect(validateNumber("-52_2131/32")).toBe(true);
  });

  it("returns true if fraction", () => {
    expect(validateNumber("5/3")).toBe(true);
  });

  it("returns true if whole number with fraction", () => {
    expect(validateNumber("53_5/3")).toBe(true);
  });

  it("returns false if negative 0", () => {
    expect(validateNumber("-0")).toBe(false);
  });

  it("returns false if negative fraction when it has whole number", () => {
    expect(validateNumber("435_-32/5")).toBe(false);
  });

  it("returns false if contains non digits", () => {
    expect(validateNumber("hello world")).toBe(false);
  });

  it("returns false if starts with _", () => {
    expect(validateNumber("_5/32")).toBe(false);
  });

  it("returns false if starts with /", () => {
    expect(validateNumber("/32")).toBe(false);
  });

  it("returns false if contains invalid fraction input", () => {
    expect(validateNumber("32/")).toBe(false);
  });

  it("returns false if fraction with 0 as denominator", () => {
    expect(validateNumber("32/0")).toBe(false);
  });

  it("returns false if contains whole number and invalid fraction input", () => {
    expect(validateNumber("32_32/")).toBe(false);
  });

  it("returns false if contains whole number and fraction with 0 as denominator", () => {
    expect(validateNumber("32_32/0")).toBe(false);
  });
});

describe("Valid operator", () => {
  it("returns true if *", () => {
    expect(validateOperator("*")).toBe(true);
  });

  it("returns true if /", () => {
    expect(validateOperator("/")).toBe(true);
  });

  it("returns true if +", () => {
    expect(validateOperator("+")).toBe(true);
  });

  it("returns true if -", () => {
    expect(validateOperator("-")).toBe(true);
  });

  it("returns false if any other string", () => {
    expect(validateOperator("--")).toBe(false);
    expect(validateOperator("-+*/")).toBe(false);
    expect(validateOperator("-asdfdsf")).toBe(false);
    expect(validateOperator("asdf+")).toBe(false);
    expect(validateOperator("asfddsf")).toBe(false);
  });
});

describe("Valid parens", () => {
  it("returns true if all parens are balanced", () => {
    expect(validateParens("(((432)()())343()s)")).toStrictEqual({
      valid: true,
      invalidIndex: undefined,
    });
  });

  it("returns true if no parens", () => {
    expect(validateParens("43543543543 0120}}}")).toStrictEqual({
      valid: true,
      invalidIndex: undefined,
    });
  });

  it("returns false if too many openning brackets and returns first instance that does not have closing bracket", () => {
    expect(validateParens("((((())")).toStrictEqual({
      valid: false,
      invalidIndex: 0,
    });
  });

  it("returns false if too many closing brackets and returns first instance that does not have openning bracket", () => {
    expect(validateParens("()))))")).toStrictEqual({
      valid: false,
      invalidIndex: 2,
    });
  });
});
