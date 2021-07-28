const chalk = require("chalk");
const { errorMessages, validatedItemTypes } = require("./constants");

const { openParens, operator, invalid, closeParens, operand } =
  validatedItemTypes;

const logError = error => {
  console.error(chalk.red(error));
};

const validateNumber = answer => {
  const rgx = /^\d+$|^[0-9]+\_?[0-9]*\/{1}[1-9]+$|^[0-9]*\/{1}[1-9]$/;
  return !!answer.match(rgx);
};

const validateOperator = answer => {
  return answer === "*" || answer === "/" || answer === "+" || answer === "-";
};

const validateParens = str => {
  const parensStack = [];

  for (let i = 0; i < str.length; i++) {
    const currLetter = str[i];
    if (currLetter === "(") {
      parensStack.push(i);
    } else if (currLetter === ")") {
      if (parensStack.length === 0) {
        return {
          valid: false,
          invalidIndex: i,
        };
      }
      parensStack.pop();
    }
  }

  return { valid: !parensStack.length, invalidIndex: parensStack[0] };
};

// Used to parse non parens and non space items
// Given an index where str[i] is not a space or '(' returns string string up to index is not equal to space or ')'
// ex: findExpression(1, '(123456789) * 3') => ({ value: 123456789, index: 10 })
const findExpression = (i, str) => {
  const end = str.length;
  let index = i;
  let value = "";

  while (index < end) {
    const currLetter = str[index];
    if (currLetter === " " || currLetter === ")") {
      return {
        value,
        index,
      };
    }
    value += currLetter;
    index++;
  }
  return {
    value,
    index,
  };
};

/*
  Given an expression, creates an array of all parens, operands, operators, and invalid items
  returns: expressionItemList = [ { type: INVALID | operator | operand | close-parens | open-parens, index: number }]
*/
const createCurrentExpressionItemList = answer => {
  const individualExpressions = [];
  let i = 0;

  while (i < answer.length) {
    const currentLetter = answer[i];

    if (currentLetter === "(") {
      individualExpressions.push({
        type: openParens,
        index: i,
      });
      i++;
    } else if (currentLetter === ")") {
      individualExpressions.push({
        type: closeParens,
        index: i,
      });
      i++;
    } else if (currentLetter === " ") {
      i++;
    } else {
      const { value: currentExpressionValue, index: currentExpressionIndex } =
        findExpression(i, answer);
      const currentExpressionResult = {
        index: i,
        type: "",
      };
      if (validateOperator(currentExpressionValue)) {
        currentExpressionResult.type = operator;
      } else if (validateNumber(currentExpressionValue)) {
        currentExpressionResult.type = operand;
      } else {
        currentExpressionResult.type = invalid;
      }
      individualExpressions.push(currentExpressionResult);
      i = currentExpressionIndex;
    }
  }
  return individualExpressions;
};

/*
  Assumes that all parentheses are valid pairs, checked by the validateParentheses above
  Returns boolean determining if expression item list is valid based off item ordering and if item types are INVALID
  Logs error if there is one to console
  params: expressionItemList = [ { type: INVALID | operator | operand | close-parens | open-parens, index: number }]
*/
const validateExpressionItemList = (expressionItemList, answer) => {
  const firstInvalidIndex = expressionItemList.findIndex(
    ({ type }) => type === invalid
  );

  if (firstInvalidIndex !== -1) {
    logError(
      errorMessages.invalidExpression(
        expressionItemList[firstInvalidIndex].index
      )
    );
    return false;
  }

  for (let i = 0; i < expressionItemList.length; i++) {
    const { type, index: answerIndex } = expressionItemList[i];
    const prevItem = expressionItemList[i - 1];
    const postItem = expressionItemList[i + 1];

    switch (type) {
      case openParens: {
        if (i !== 0) {
          if (
            answer[answerIndex - 1] !== " " &&
            answer[answerIndex - 1] !== "("
          ) {
            logError(errorMessages.requireSpaceMessage(answerIndex, true));
            return false;
          } else if (
            prevItem.type === closeParens ||
            prevItem.type === operand
          ) {
            logError(errorMessages.requireOperatorMessage(answerIndex, true));
            return false;
          }
        }
        break;
      }
      case closeParens: {
        if (i !== expressionItemList.length - 1) {
          if (
            answer[answerIndex + 1] !== " " &&
            answer[answerIndex + 1] !== ")"
          ) {
            logError(errorMessages.requireSpaceMessage(answerIndex, false));
            return false;
          } else if (postItem.type === operand) {
            logError(errorMessages.requireOperatorMessage(answerIndex, false));
            return false;
          }
        }
        break;
      }
      case operator: {
        if (i === 0) {
          logError(errorMessages.requireOperandMessage(answerIndex, true));
          return false;
        } else if (i === expressionItemList.length - 1) {
          logError(errorMessages.requireOperandMessage(answerIndex, false));
          return false;
        } else {
          if (answer[answerIndex - 1] !== " ") {
            logError(errorMessages.requireSpaceMessage(answerIndex, true));
            return false;
          } else if (answer[answerIndex + 1] !== " ") {
            logError(errorMessages.requireSpaceMessage(answerIndex, false));
            return false;
          }
          if (prevItem.type === operator || prevItem.type === openParens) {
            logError(errorMessages.requireOperandMessage(answerIndex, true));
            return false;
          } else if (
            [postItem].type === operator ||
            [postItem].type === closeParens
          ) {
            logError(errorMessages.requireOperandMessage(answerIndex, false));
            return false;
          }
        }
        break;
      }
      case operand: {
        if (prevItem && prevItem.type === operand) {
          logError(errorMessages.requireOperatorMessage(answerIndex, true));
          return false;
        } else if (prevItem && prevItem.type === operand) {
          logError(errorMessages.requireOperatorMessage(answerIndex, false));
          return false;
        }
        break;
      }
    }
  }
  return true;
};

// consoles error message and portion that errors out
// return boolean valid
const validate = answer => {
  const { valid: hasvalidateParens, invalidIndex: invalidateParensIndex } =
    validateParens(answer);

  if (!hasvalidateParens) {
    logError(errorMessages.invalidateParens(invalidateParensIndex));
    return false;
  }

  const currentExpressionItemList = createCurrentExpressionItemList(answer);

  return validateExpressionItemList(currentExpressionItemList, answer);
};

module.exports = {
  createCurrentExpressionItemList,
  findExpression,
  logError,
  validate,
  validateExpressionItemList,
  validateNumber,
  validateOperator,
  validateParens,
};
