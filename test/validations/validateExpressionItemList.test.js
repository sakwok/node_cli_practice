const {
  createCurrentExpressionItemList,
  validateExpressionItemList,
} = require("../../src/validations");

describe("Find Current Expression", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    console.error.mockRestore();
  });

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
    expect(console.error.mock.calls[0][0].includes("6")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operator")).toEqual(true);
  });

  it("returns false when single operator", () => {
    const input = "*";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("0")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operand")).toEqual(true);
  });

  it("returns false when expression starts with operator", () => {
    const input = "* 324";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("0")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operand")).toEqual(true);
  });

  it("returns false when expression ends with operator", () => {
    const input = "324 *";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("4")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operand")).toEqual(true);
  });

  it("returns false when expression has multiple operators in a row", () => {
    const input = "324 * * 324";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("6")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operand")).toEqual(true);
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
    expect(console.error.mock.calls[0][0].includes("1")).toEqual(true);
    expect(
      console.error.mock.calls[0][0].includes("Invalid Expression")
    ).toEqual(true);
  });

  it("returns false when no space between close parens and operand", () => {
    const input = "(1_2/3)* 5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("6")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Space")).toEqual(true);
  });

  it("returns false when no space between open parens and operand", () => {
    const input = "5 *(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("2")).toEqual(true);
    expect(
      console.error.mock.calls[0][0].includes("Invalid Expression")
    ).toEqual(true);
  });

  it("returns false when no space between two parens expressions", () => {
    const input = "(5)(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("2")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Space")).toEqual(true);
  });

  it("returns false when no operator between two parens expressions", () => {
    const input = "(5) (1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("4")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operator")).toEqual(true);
  });

  it("returns false when no space between number first and parens", () => {
    const input = "5(1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("0")).toEqual(true);
    expect(
      console.error.mock.calls[0][0].includes("Invalid Expression")
    ).toEqual(true);
  });

  it("returns false when no operator between number first and parenss", () => {
    const input = "5 (1_2/3)";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("2")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operator")).toEqual(true);
  });

  it("returns false when no space between parens first and number", () => {
    const input = "(1_2/3)5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("6")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Space")).toEqual(true);
  });

  it("returns false when no operator between parens first and number", () => {
    const input = "(1_2/3) 5";
    const currentExpressionItemList = createCurrentExpressionItemList(input);
    expect(validateExpressionItemList(currentExpressionItemList, input)).toBe(
      false
    );

    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0].includes("6")).toEqual(true);
    expect(console.error.mock.calls[0][0].includes("Operator")).toEqual(true);
  });
});
