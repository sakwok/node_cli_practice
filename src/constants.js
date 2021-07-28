const genErrorMessage = text => index =>
  `\n Please fix Invalid ${text} starting @ index ${index}`;

const genRequireItemMessage = text => (index, isBefore) =>
  `\n Please add a ${text} ${
    isBefore ? "before" : "after"
  } item at index ${index}`;

const errorMessages = {
  invalidateParens: genErrorMessage("Parentheses"),
  invalidOperand: genErrorMessage("Operand"),
  invalidExpression: genErrorMessage("Expression"),
  requireSpaceMessage: genRequireItemMessage("Space"),
  requireOperatorMessage: genRequireItemMessage("Operator"),
  requireOperandMessage: genRequireItemMessage("Operand"),
};

const validatedItemTypes = {
  closeParens: "closeParens",
  invalid: "invalid",
  openParens: "openParens",
  operand: "operand",
  operator: "operator",
};

module.exports = {
  errorMessages,
  validatedItemTypes,
};
