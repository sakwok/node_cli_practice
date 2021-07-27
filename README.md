This project requires Node installed

Set up
yarn or npm install
yarn start / npm start

Test
yarn test / npm test

Basic Requirements

- only allow digits for initial character
- only allow one underscore per number
- +,-,/,\* operators
- require spaces between operators
- distinguish fraction from dividing
- MDAS

Extra

- parentheses

Test cases

- cannot divide 0 or have 0 as denominator
- user enters nothing
- happy path
- user enters non digits/operators/\_
- user does not enter space between operators
- invalid chain of operators
- multiple underscore per number
- enters only one number reduce to LCD fraction
