const validNumber = answer => {
  const rgx = /^\d+$|^[0-9]*\_?[0-9]*\/{1}[1-9]+$|^[0-9]*\/{1}[1-9]$/;
  return !!answer.match(rgx);
};

const validOperator = answer => {
  return answer === "*" || answer === "/" || answer === "+" || answer === "-";
};

const validate = answer => {};

const errorMessages = {};

module.exports = {
  validNumber,
  validOperator,
  errorMessages,
};
