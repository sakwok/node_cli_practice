const { validateOperator, validateFractionPart } = require("./validations");

// Since we already validated, ALL math assumes that all numbers are in correct format and do not have 0 as a denominator

/*
    params: a: number, b: number
    returns: GCD: number
*/
const findGCD = (a, b) => {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

/*
    params: string formatted 32_1/2 | 32 | 1/2
    returns: numerator: number, denominator: number,
*/
const getFractionValue = answer => {
  const singleDigitRgx = /^-?\d+$/;

  if (answer.match(singleDigitRgx)) {
    return {
      numerator: parseInt(answer),
      denominator: 1,
    };
  }

  const separatedValues = answer.split("_");

  if (separatedValues.length === 1) {
    const [numerator, denominator] = separatedValues[0]
      .split("/")
      .map(item => parseInt(item));
    return {
      numerator,
      denominator,
    };
  }

  const [numerator, denominator] = separatedValues[1]
    .split("/")
    .map(item => parseInt(item));
  const wholeNumber = parseInt(separatedValues[0]);
  return {
    numerator: wholeNumber
      ? (numerator + Math.abs(wholeNumber * denominator)) *
        Math.sign(wholeNumber)
      : numerator + wholeNumber * denominator,
    denominator,
  };
};

/*
    params: numerator: number, denominator: number,
    returns: string formatted 32_1/2
*/
const reduceFraction = ({ numerator, denominator }) => {
  if (denominator === 1 || numerator === 0) {
    return `${numerator}`;
  }

  const gcd = Math.abs(findGCD(numerator, denominator));
  const reducedNumerator = numerator / gcd;
  const reducedDenominator = denominator / gcd;

  const numOverDenom = reducedNumerator / reducedDenominator;

  if (Math.abs(numOverDenom) >= 1) {
    let wholeNumber =
      Math.floor(Math.abs(numOverDenom)) * Math.sign(numOverDenom);

    const subtractedNumerator =
      reducedNumerator - reducedDenominator * wholeNumber;

    if (subtractedNumerator === 0) {
      return `${wholeNumber}`;
    }
    return `${wholeNumber}_${Math.abs(
      subtractedNumerator
    )}/${reducedDenominator}`;
  }

  return `${reducedNumerator}/${reducedDenominator}`;
};

/*
    params: a: {numerator: number, denominator: number,}, b: {numerator: number, denominator: number,}
    returns: {numerator: number, denominator: number,}
*/
const fractionAddition = (a, b) => ({
  numerator: a.numerator * b.denominator + b.numerator * a.denominator,
  denominator: a.denominator * b.denominator,
});

/*
    params: a: {numerator: number, denominator: number,}, b: {numerator: number, denominator: number,}
    returns: {numerator: number, denominator: number,}
*/
const fractionMultiplication = (a, b) => ({
  numerator: a.numerator * b.numerator,
  denominator: a.denominator * b.denominator,
});

/*
    params: a: {numerator: number, denominator: number,}, b: {numerator: number, denominator: number,}
    returns: {numerator: number, denominator: number,}
*/
const fractionDivision = (a, b) => ({
  numerator: a.numerator * b.denominator,
  denominator: a.denominator * b.numerator,
});

const handleOperators = (stack, sign, fractionValue) => {
  switch (sign) {
    case "+": {
      stack.push(fractionValue);
      break;
    }
    case "-": {
      stack.push({
        numerator: fractionValue.numerator * -1,
        denominator: fractionValue.denominator,
      });
      break;
    }
    case "*": {
      stack[stack.length - 1] = fractionMultiplication(
        stack[stack.length - 1],
        fractionValue
      );
      break;
    }
    case "/": {
      stack[stack.length - 1] = fractionDivision(
        stack[stack.length - 1],
        fractionValue
      );
      break;
    }
  }
};

/*
    For the Initial call in cli.js, we split the string into individual characters and reverses it, so we can pop off the items in O(1) time.
    The decision to transform the input into an array in this case is so in further calls of recursion, we can easily point to the existing array and pick off where we left in the original call.

    We simply transverse through the input array and build up our operands until we reach an operator where we then add the operand to the stack following the previous operator's respective logic (We start with adding the first number to 0) 

    To evaluate parens, we use recursion to evaluate the expression within the parens and add the cumulative result to the stack once we reach the end bracket.

    params: answer: string
    returns: result: string
*/
const calculate = answer => {
  let num = "";
  let sign = "+";
  const stack = [];

  while (answer.length > 0) {
    const currentLetter = answer.pop();
    const isPartOfOperandNotOperator =
      (currentLetter === "/" && answer[answer.length - 1] !== " ") ||
      (currentLetter === "-" && answer[answer.length - 1] !== " ");
    if (validateFractionPart(currentLetter) || isPartOfOperandNotOperator) {
      num += currentLetter;
    }
    if (currentLetter === "(") {
      num = calculate(answer);
    }
    if (
      (validateOperator(currentLetter) && !isPartOfOperandNotOperator) ||
      answer.length === 0
    ) {
      const fractionValue = getFractionValue(num);

      handleOperators(stack, sign, fractionValue);
      sign = currentLetter;
      num = "";
    }

    if (currentLetter === ")") {
      const fractionValue = getFractionValue(num);
      handleOperators(stack, sign, fractionValue);
      break;
    }
  }

  const result = stack.reduce((acc, curr) => fractionAddition(acc, curr), {
    numerator: 0,
    denominator: 1,
  });

  return reduceFraction(result);
};

module.exports = {
  calculate,
  findGCD,
  fractionAddition,
  fractionDivision,
  fractionMultiplication,
  getFractionValue,
  reduceFraction,
};
