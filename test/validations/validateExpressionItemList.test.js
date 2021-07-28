const {
  createCurrentExpressionItemList,
  validateExpressionItemList,
} = require("../../src/validations");

jest.spyOn(console, "error");

describe("Find Current Expression", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns true and does not error error when simple operand", () => {
    const input = "1_2/3 * 3_4/5 / (6 + 8) - (7)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      true
    );
    expect(console.error.mock.calls.length).toBe(0);
  });

  it("returns true if single number", () => {
    const input = "1_2/3";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      true
    );
    expect(console.error.mock.calls.length).toBe(0);
  });

  it("returns false when multiple operands in a row", () => {
    const input = "12345 6789 10";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operator before item at index 6"
    );
  });

  it("returns false when single operator", () => {
    const input = "*";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operand before item at index 0"
    );
  });

  it("returns false when expression starts with operator", () => {
    const input = "* 324";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operand before item at index 0"
    );
  });

  it("returns false when expression ends with operator", () => {
    const input = "324 *";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operand after item at index 4"
    );
  });

  it("returns false when expression has multiple operators in a row", () => {
    const input = "324 * * 324";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operand before item at index 6"
    );
  });

  it("returns true when single item with parens", () => {
    const input = "(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      true
    );
    expect(console.error.mock.calls.length).toBe(0);
  });

  it("returns true when input includes expression with parens", () => {
    const input = "  (1_2/3 + 5) - (32 * 5) /   (5_3/2)   ";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      true
    );
    expect(console.error.mock.calls.length).toBe(0);
  });

  it("returns false when invalid expression in parens", () => {
    const input = "(1_2/01) + 5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please fix Invalid Expression starting @ index 1"
    );
  });

  it("returns false when no space between close parens and operand", () => {
    const input = "(1_2/3)* 5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Space after item at index 6"
    );
  });

  it("returns false when no space between open parens and operand", () => {
    const input = "5 *(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please fix Invalid Expression starting @ index 2"
    );
  });

  it("returns false when no space between two parens expressions", () => {
    const input = "(5)(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Space after item at index 2"
    );
  });

  it("returns false when no operator between two parens expressions", () => {
    const input = "(5) (1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operator before item at index 4"
    );
  });

  it("returns false when no space between number first and parens", () => {
    const input = "5(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please fix Invalid Expression starting @ index 0"
    );
  });

  it("returns false when no operator between number first and parenss", () => {
    const input = "5 (1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operator before item at index 2"
    );
  });

  it("returns false when no space between parens first and number", () => {
    const input = "(1_2/3)5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Space after item at index 6"
    );
  });

  it("returns false when no operator between parens first and number", () => {
    const input = "(1_2/3) 5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toBe(
      "\n Please add a Operator after item at index 6"
    );
  });
});
