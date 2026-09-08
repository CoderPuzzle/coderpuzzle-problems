# Fibonacci On Demand

## Description

Build a generator function that hands out the Fibonacci sequence one
number at a time, forever. The sequence follows the recurrence
`Xn = Xn-1 + Xn-2` and opens with 0, 1, 1, 2, 3, 5, 8, 13.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function `fibonacciStream()`
that yields the sequence, and declares a class `Solution` whose
`run(stepCase)` hands that function to the bundle-provided case carrier:
`stepCase.drive(fibonacciStream)`. The driver calls `fibonacciStream()`,
steps the returned generator exactly this case's `callCount` times
through repeated `.next()` calls, and the judge compares the array of
collected `.value` numbers — the first `callCount` Fibonacci numbers in
yield order — against the expected list exactly. The generator object
itself never crosses the wire; only its yielded numbers are judged, and
a generator that finishes before `callCount` yields is rejected because
the true sequence is infinite.

### Example 1

```text
Input: callCount = 8
Output: [0,1,1,2,3,5,8,13]
Explanation:
const stream = fibonacciStream();
stream.next().value; // 0
stream.next().value; // 1
stream.next().value; // 1
stream.next().value; // 2
stream.next().value; // 3
stream.next().value; // 5
stream.next().value; // 8
stream.next().value; // 13
```

### Example 2

```text
Input: callCount = 1
Output: [0]
Explanation: A single `.next()` draws only the opening term of the
sequence.
```

### Example 3

```text
Input: callCount = 12
Output: [0,1,1,2,3,5,8,13,21,34,55,89]
Explanation: Twelve draws reach 89; each draw after the first pair is
just the sum of the two numbers before it.
```

### Constraints

- `0 <= callCount <= 50`
