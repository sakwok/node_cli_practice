const { validNumber, validOperator, validate } = require("./validations");

const findClosingParens = (i, str) => {
  const end = str.length;
  const parensStack = [true];
  let value = "";
  let index = i + 1;

  while (index < end) {
    const currLetter = str[index];
    if (currLetter === "(") {
      parensStack.push(true);
    } else if (currLetter === ")") {
      parensStack.pop();
    }

    if (parensStack.length === 0)
      return {
        value,
        index: index + 1,
      };
    value += currLetter;
    index++;
  }
  return {
    value,
    index: -1,
  };
};

const findExpression = (i, str) => {
  const end = str.length;
  let index = i;
  let value = "";

  while (index < end) {
    const currLetter = str[index];
    if (currLetter === "(") {
      return {
        value,
        index,
      };
    } else if (currLetter === " ") {
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

const parseValidation = answer => {
  //   const parsedResult = answer.split(/[ ]+/);
  let index = 0;
  const parsedResult = [];

  while (index < answer.length) {
    const currLetter = answer[index];

    if (currLetter === "(") {
      if (
        parsedResult[parsedResult.length - 1] &&
        parsedResult[parsedResult.length - 1].type !== "operand"
      ) {
        parsedResult.push({ value: "*" });
      }
      const parensResult = findClosingParens(index, answer);
      const parensItem = {
        value: parensResult.value,
        type: "parensExpression",
      };

      if (parensResult.index === -1) {
        parensItem.type = "INVALID";
        parsedResult.push(parensItem);
        return parsedResult;
      }
      parsedResult.push(parensItem);

      index = parensResult.index;
    } else if (currLetter !== " ") {
      const operatorOrOperandResult = findExpression(index, answer);
      const operatorOrOperandItem = {
        value: operatorOrOperandResult.value,
      };

      if (
        parsedResult[parsedResult.length - 1] &&
        parsedResult[parsedResult.length - 1].type === "parensExpression" &&
        !isOperator(operatorOrOperandResult.value)
      ) {
        parsedResult.push({ value: "*", type: "operand" });
        if (validNumber)
          parsedResult.push({ ...operatorOrOperandItem, type: "number" });
      } else {
        parsedResult.push({ ...operatorOrOperandItem, type: "operand" });
      }

      index = operatorOrOperandResult.index;
    } else {
      index++;
    }
  }

  return parsedResult;
};

module.exports = {
  parseValidation,
  findClosingParens,
  findExpression,
  isOperator,
};
