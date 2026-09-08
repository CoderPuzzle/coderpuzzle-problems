# A Ladder Of Factorials

## Description

Build a generator function that takes one integer `n` and hands back a
generator object which yields the factorial ladder: 1, 2, 6, 24, ... —
every successive factorial up to `n!` and no further.

The factorial sequence obeys the recurrence
`n! = n * (n-1) * (n-2) * ... * 2 * 1`, and the ladder's base rung is
fixed by definition: `0! = 1`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function `factorial(n)` that
yields one factorial per step, and declares a class `Solution` whose
`run(factCase)` hands that function to the bundle-provided case carrier:
`factCase.drive(factorial)`. The carrier calls `factorial` with this
case's `n`, then steps the returned generator with repeated `.next()`
calls until it reports done, and the judge compares the array of
collected `.value` numbers — the yielded factorials in yield order —
against the expected list exactly. The generator object itself never
crosses the wire; only its yielded numbers are judged.

### Example 1

```text
Input: n = 6
Output: [1,2,6,24,120,720]
Explanation:
const gen = factorial(6)
gen.next().value // 1
gen.next().value // 2
gen.next().value // 6
gen.next().value // 24
gen.next().value // 120
gen.next().value // 720
```

### Example 2

```text
Input: n = 1
Output: [1]
Explanation: Only the base rung exists — `0!` and `1!` are both 1, so
`n = 1` still yields the single opening value.
```

### Example 3

```text
Input: n = 10
Output: [1,2,6,24,120,720,5040,40320,362880,3628800]
Explanation: Ten draws climb the ladder from 1! through 10!, each rung
one multiplication past the one before it.
```

### Constraints

- 0 <= n <= 18
