# One Promise Over A Parallel Batch

## Description

Given an array `functions` of asynchronous functions — each taking no
arguments and returning a promise — write a function `gatherAll(functions)`
that starts every one of them immediately, so the whole batch runs in
parallel, and returns a single new promise aggregating the batch.

That returned promise resolves when every promise produced by the batch
has resolved. Its value is an array of all the resolved values, ordered by
each function's original position in `functions` no matter the order in
which they actually settled.

It rejects as soon as any member of the batch rejects, rejecting with the
reason of the first rejection (if several reject at the same moment, the
one whose function comes first in the array wins).

Do not reach for the built-in `Promise.all()` — the aggregation is the
exercise.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers. Your submission defines `gatherAll(functions)` and declares a
class `Solution` whose `run(batchDriver)` hands that function to the
bundle-provided driver: `return batchDriver.drive(gatherAll)`. The driver
turns this case's specs into live functions that return real promises,
each settling after its stated delay on the virtual clock, calls your
`gatherAll` with them, and awaits the returned promise: when every
function resolves, your promise must resolve with all the values ordered
by their original index, and when any function rejects, your promise must
reject with the reason of the first rejection (simultaneous rejections
break ties by original index). Wall-clock timing is deliberately not
judged: each case compares exactly one outcome, either
`{"resolved": [...]}` or `{"rejected": <reason>}`, so any correct
implementation produces the expected result regardless of machine speed.

### Example 1

```text
Input: functions = [
  { "kind": "fulfilled", "delay": 140, "value": 6 }
]
Output: {"resolved": [6]}
Explanation: The lone function settles at 140ms with 6, and the aggregate
resolves as soon as the batch is done.
```

### Example 2

```text
Input: functions = [
    { "kind": "fulfilled", "delay": 50, "value": 2 },
    { "kind": "fulfilled", "delay": 130, "value": 20 },
    { "kind": "fulfilled", "delay": 90, "value": 200 }
]
Output: {"resolved": [2, 20, 200]}
Explanation: The promises settle in array order here, but any settle
order gives the same result — values line up by original index, and the
aggregate waits for the last one (130ms).
```

### Example 3

```text
Input: functions = [
    { "kind": "fulfilled", "delay": 60, "value": 1 },
    { "kind": "rejected", "delay": 30, "reason": "fast fail" },
    { "kind": "fulfilled", "delay": 120, "value": 3 }
]
Output: {"rejected": "fast fail"}
Explanation: The rejection at 30ms is the first settlement failure, so the
aggregate rejects with that same reason while the others are still
running.
```

### Constraints

- functions is an array whose entries are function specs: each settles
  fulfilled with a `value` or rejected with a `reason`, after `delay` on
  the virtual clock
- 1 <= functions.length <= 10
