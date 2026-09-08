# A Chainable Calculator

## Description

Design a calculator class. Its constructor takes one number — the
starting value of its running result — and every operation updates that
result while handing back the calculator itself, so operations can chain
one after another. The class should provide:

- add(value) — adds value to the result and returns the updated calculator.
- subtract(value) — subtracts value from the result and returns the updated
  calculator.
- multiply(value) — multiplies the result by value and returns the updated
  calculator.
- divide(value) — divides the result by value and returns the updated
  calculator. If value is 0, an error "Division by zero is not allowed"
  must be thrown.
- power(value) — raises the result to the power of value and returns the
  updated calculator.
- getResult() — returns the result.

Answers within 10⁻⁵ of the true result are considered correct.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines the `ChainCalc` class and a
`Solution.solve(replayCase)` adapter. The adapter should call
`replayCase.drive(ChainCalc)` so the bundle-provided case driver
constructs the calculator from the first value, performs every remaining
action in order, and records the final `getResult()` value — or the
thrown error's message when an operation fails; results within 10⁻⁵ of
the expected value are accepted.

### Example 1

```text
Input:
actions = ["ChainCalc", "multiply", "add", "getResult"],
values = [3, 4, 6]
Output: 18
Explanation:
new ChainCalc(3).multiply(4).add(6).getResult() // 3 * 4 + 6 = 18
```

### Example 2

```text
Input:
actions = ["ChainCalc", "subtract", "power", "getResult"],
values = [9, 2, 3]
Output: 343
Explanation:
new ChainCalc(9).subtract(2).power(3).getResult() // (9 - 2) ** 3 = 343
```

### Example 3

```text
Input:
actions = ["ChainCalc", "add", "divide", "getResult"],
values = [5, 5, 0]
Output: "Division by zero is not allowed"
Explanation:
new ChainCalc(5).add(5).divide(0).getResult() // 10 / 0
```

The error must be thrown because dividing by zero is not allowed.

### Constraints

- actions is a valid JSON array of strings
- values is a valid JSON array of numbers
- 2 <= actions.length <= 2 \* 10⁴
- 1 <= values.length <= 2 \* 10⁴ - 1
- actions[i] is one of "ChainCalc", "add", "subtract", "multiply",
  "divide", "power", and "getResult"
- First action is always "ChainCalc"
- Last action is always "getResult"
