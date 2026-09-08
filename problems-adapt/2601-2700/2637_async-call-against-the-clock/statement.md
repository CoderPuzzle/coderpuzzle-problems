# An Async Call Against The Clock

## Description

Hand in an asynchronous function `fn` and a deadline `t` in
milliseconds, and get back a guarded copy of that function. Calling the
copy with some arguments starts `fn` on those arguments right away and
races it against a timer that fires exactly `t` milliseconds later. The
guarded copy settles however the race ends:

- `fn` finishing inside the window settles the copy the way `fn`
  settled — fulfilled with its value, or rejected with whatever reason
  it threw.
- The deadline winning rejects the copy with the string
  "Time Limit Exceeded", and anything `fn` would still produce is
  discarded.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of
real timers — the bundle-provided `RaceCase` carries `.fn`, the callable
built from the case's function source, plus `.inputs` and `.t`, and both
the fn internals and your implementation arm their delays against the
same virtual clock because `setTimeout` itself is captured by the
harness. Your submission defines `withDeadline(fn, t)` and declares a
class `Solution` whose `run(raceCase)` hands that function over with
`return raceCase.drive(withDeadline)`; the driver builds the guarded
call, makes exactly one judged call `guarded(...inputs)`, awaits the
returned promise, and compares the outcome object exactly:
`{"resolved": <settlement value>}` when fn wins the race or
`{"rejected": <rejection reason>}` when the deadline wins, including
`"Time Limit Exceeded"` for the deadline. The crawled Output column
additionally displayed a wall-clock `"time"` field; CoderPuzzle drops that
real-time field deliberately — machine speed must not decide answers —
and judges only the settled outcome above.

### Example 1

```text
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 140));
  return n * 9;
}
inputs = [6]
t = 110
Output: {"rejected":"Time Limit Exceeded"}
Explanation: The 110 ms deadline expires long before fn's internal
140 ms wait, so the guarded call rejects with "Time Limit Exceeded"
and the product 6 * 9 is never produced.
```

### Example 2

```text
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 70));
  return n * 12;
}
inputs = [4]
t = 250
Output: {"resolved":48}
Explanation: fn lands 4 * 12 = 48 at t=70 ms, comfortably inside the
250 ms window, so the guarded call resolves with 48.
```

### Example 3

```text
Input:
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 45));
  await new Promise(res => setTimeout(res, 55));
  return a * b;
}
inputs = [3,7]
t = 200
Output: {"resolved":21}
Explanation: fn's two waits stack — 45 ms and then 55 ms — so the
result 3 * 7 = 21 only exists at t=100 ms, still ahead of the
200 ms deadline.
```

### Example 4

```text
Input:
fn = async () => {
  throw "Aborted";
}
inputs = []
t = 800
Output: {"rejected":"Aborted"}
Explanation: fn rejects the moment it runs, and the guarded call
passes that rejection straight through — the 800 ms deadline never
gets a say.
```

### Constraints

- `0 <= inputs.length <= 10`
- `0 <= t <= 1000`
- `fn` always returns a promise

## Hints

### Hint 1

A function that returns a function is just a closure: write an outer
function capturing `fn` and `t`, and have it return an inner function
that spreads its own arguments into a call to `fn`.

### Hint 2

The inner function should hand back a promise it controls, built as
`new Promise((resolve, reject) => { ... })`.

### Hint 3

Arm the deadline inside the executor with a delayed callback: once
`t` milliseconds have passed, invoke `reject("Time Limit Exceeded")`.

### Hint 4

Give both racers the same settlement channel — forward `fn`'s
fulfillment and rejection into the very `resolve` and `reject` the timer
already closes over. Whichever side settles first wins, and promise
semantics simply ignore the second call.
