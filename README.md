# Nodejs Cli Practice - Fraction Calculator

Practice building a cli interface with Nodejs

### Dependencies

- Node.js

### Installing

```
npm install
# or
yarn
```

### Executing program

- How to run the program

```
npm start
# or
yarn start
```

- How to exit the program

```
exit
# or
ctrl-C
```

- How to test the program

```
npm test
# or
yarn test
```

## Features

- Allows multiple operands/operations
- Allows negative numbers
- Input validation with error messages indicating where the problem is and suggestions on how to fix it
- Parentheses (parentheses require spaces just like operators, do not replace \*, and cannot be negative)

### Client Interface

For this project I decided to build my command-line program with Nodejs as it is fast to iterate and develop. Furthermore, it is easily understandable for both Frontend and Backend developers and does not require extra compile steps in a Node environment.
In order to interact with the command line, I opted to use Inquirer.js package for a simple lightweight prompt to save time and focus on the actual calculator functionality as opposed to classic Node readline and all-encompassing commander.js.

### Validation

Under the assumption that there would only be two variables entered with a basic operator between them, my first thought was to split by spaces and validate each item to see if they were a valid number or operator.
If the user entered an invalid input, I would allow them to retry until they entered a valid expression.
Since there were only two variables, I wouldn't have to worry about PEMDAS and simply perform the fractional operations between them.
As the scope of the project grew to include parentheses and multiple operators/operands, I expanded on my approach to create an array of objects which represented 5 different types (invalid, operand, operator, openParens, and closeParens).

- First off I would search through the entire string to see if all parentheses had a valid pair and if not I would return an error message
- Then I would sort items into one of the 5 types I specified, and immediately flag any invalid characters/expressions and their corresponding error
- Once I had an array of all valid items, I would then check positioning rules. (ex: Can't be operand operator operator operand, etc)
- If everything passed validation, I would then confidently be able to perform calculations

### Fractional Calculator logic

I began by reviewing elementary school math and writing helpers for reducing functions to simplest form, addition, multiplication, and division.
The next step I took was writing a parser to parse numbers into numerators and denominators.
Then I faced the challenge of actually combining all operands together while abiding MDAS order of operations.

- I first started by simplifying subtraction to adding a number multiplied by -1 and realised when we reach the end of a string it should trigger an operation
- Similarly once we encounter a new operation, it should trigger the previous because you cannot trigger a current operation since you do not know what is ahead yet
- Building off this observation, multiplication and division operators immediately combine the values surrounding them as opposed to addition where you can slowly build up until the end
- Then I decided to use an array because it allows one to slowly build up values while being able to execute on the last item immediately
- Once I introduced parentheses, I evaluated the characters between the parentheses as a new expression with recursion, and changed my parameter to be an array to help keep track of transversal

### Further Improvements

- Adding more test coverage, testing client logic
- Cleaning up validation rules and negative logic
- Improving calculator to not rely on recursion
- Adding more functionality such as exponents
- Handle big int
