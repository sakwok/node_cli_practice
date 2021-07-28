const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const { validate } = require("./validations");
const { calculate } = require("./math");

const calculateQuestion = {
  type: "input",
  name: "calculate",
  message: "Please enter the mathematical expression you wish to evaluate",
  validate,
};

const commandPrompt = async loop => {
  try {
    const answer = await inquirer.prompt([calculateQuestion]);

    if (answer.calculate === "exit") {
      loop.continue = false;
    } else {
      const result = calculate(answer.calculate.split("").reverse());
      console.log(chalk.greenBright(result));
    }
  } catch (e) {
    console.error(chalk.red(e));
  }
};

const main = async () => {
  clear();
  console.log(
    chalk.cyan(
      figlet.textSync("Fraction Calculator", { horizontalLayout: "full" })
    )
  );

  const loop = { continue: true };

  while (loop.continue) {
    await commandPrompt(loop);
  }
};

module.exports = main;
