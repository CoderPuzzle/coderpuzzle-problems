# One Settled Report Per Promise

## Description

Given an array `functions`, each element a zero-argument call that
returns a promise, write `settleAll(functions)` — it must start every
function immediately, so the whole batch runs in parallel, and hand back
one promise of its own.

That promise resolves with one report per input promise, positioned by
the input's original order no matter when the promises actually settle.
A report takes exactly one of two shapes:

- resolved input: `{ status: "fulfilled", value: <resolved value> }`
- rejected input: `{ status: "rejected", reason: <rejection reason> }`

The rejection reason is whatever the promise was rejected with — usually
an error message string, but any value is legal.

Do not reach for the built-in `Promise.allSettled()` — collecting the
reports is the exercise.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of
real timers. Your submission defines `settleAll(functions)` and declares
a class `Solution` whose `run(driver)` hands that function to the
bundle-provided driver: `return driver.drive(settleAll)`. The driver
turns this case's specs into live functions that return real promises,
each settling after its stated delay on the virtual clock, calls your
`settleAll` with them, awaits the returned promise, and the judge
compares the settled array exactly: one `{status, value}` or
`{status, reason}` object per index, in the original order. Wall-clock
timing is deliberately not judged: each case compares only the settled
reports, so any correct implementation produces the expected array
regardless of machine speed.

### Example 1

```text
Input: functions = [
    { "kind": "fulfilled", "delay": 120, "value": 7 }
]
Output: [{"status":"fulfilled","value":7}]
Explanation: The lone function settles at 120ms with 7, and the
aggregate resolves as soon as that single report is in.
```

### Example 2

```text
Input: functions = [
    { "kind": "fulfilled", "delay": 90, "value": 1 },
    { "kind": "rejected", "delay": 30, "reason": "boom" },
    { "kind": "fulfilled", "delay": 150, "value": 2 }
]
Output: [{"status":"fulfilled","value":1},{"status":"rejected","reason":"boom"},{"status":"fulfilled","value":2}]
Explanation: Settlement order (index 1 first, at 30ms) has no influence
on the report order: each report sits at its function's original index,
and the aggregate waits for the slowest one (150ms).
```

### Example 3

```text
Input: functions = [
    { "kind": "rejected", "delay": 40, "reason": { "code": 5 } },
    { "kind": "fulfilled", "delay": 40, "value": false }
]
Output: [{"status":"rejected","reason":{"code":5}},{"status":"fulfilled","value":false}]
Explanation: Two functions settle at the same moment, and a rejection
does not sink the batch — its reason is recorded verbatim (any JSON
value is legal) while the other input still reports fulfilled.
```

### Constraints

- `1 <= functions.length <= 10`
