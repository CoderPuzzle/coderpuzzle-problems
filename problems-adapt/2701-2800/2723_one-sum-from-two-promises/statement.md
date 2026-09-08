# One Sum From Two Promises

## Description

Two promises come in, each guaranteed to resolve with a number. Return
one new promise of your own that resolves with the sum of those two
numbers, no matter which of the inputs settles first or how long either
takes.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers. Your submission defines `sumPromises(promise1, promise2)` — a
function taking the two input promises and returning a new promise that
resolves with their sum — and declares a class `Solution` whose
`run(driver)` hands that function to the bundle-provided driver:
`return driver.drive(sumPromises)`. The driver turns this case's two
specs into real promises — each resolving with its stated value once its
stated delay elapses on the virtual clock — calls your sumPromises with
them, awaits the returned promise, and the judge compares the resolved
number exactly. Wall-clock timing is deliberately not judged: only the
sum the returned promise resolves with matters, so any correct
implementation passes regardless of machine speed.

### Example 1

```text
Input:
promise1 = {"value": 12, "delay": 45},
promise2 = {"value": 30, "delay": 80}
Output: 42
Explanation: The inputs resolve with 12 and 30 respectively, and the
returned promise resolves with 12 + 30 = 42. The 80ms input gates the
moment the sum appears, but that moment itself is not judged.
```

### Example 2

```text
Input:
promise1 = {"value": -8, "delay": 25},
promise2 = {"value": -9, "delay": 65}
Output: -17
Explanation: Both values are negative; the returned promise resolves
with -8 + -9 = -17 once the slower input has resolved.
```

### Example 3

```text
Input:
promise1 = {"value": 0, "delay": 0},
promise2 = {"value": 5, "delay": 15}
Output: 5
Explanation: The first input is already due at time zero, yet the sum is
still produced only after the second input resolves: 0 + 5 = 5.
```

### Constraints

- promise1 and promise2 are promises that resolve with a number
