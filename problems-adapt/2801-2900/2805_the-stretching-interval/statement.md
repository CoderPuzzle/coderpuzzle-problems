# The Stretching Interval

## Description

Function `stretchInterval`

Given a function `fn`, a number `delay` and a number `period`, return a
number `id`.

`stretchInterval` should execute `fn` over and over on a schedule that
stretches every round: the k-th gap follows the linear pattern
`delay + period * count`, where `count` is how many times `fn` has
already run, starting from 0.

Function `stretchCancel`

Given an `id` — the value returned by `stretchInterval` —
`stretchCancel` should stop that schedule from running `fn` again.

Note: the `setTimeout` and `setInterval` functions in Node.js return an
object, not a number.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. It is judged on a
deterministic virtual clock instead of real timers: your submission
declares `function stretchInterval(fn, delay, period)` returning a
number id and `function stretchCancel(id)` stopping the repetition tied
to that id, plus a class `Solution` whose `run` method hands both to
the bundle-provided driver: `stretchCase.drive(stretchInterval,
stretchCancel)`. During `drive` the driver replaces the global
`setTimeout`/`clearTimeout` with virtual-clock equivalents, supplies
its own recording fn (every actual execution of fn appends the virtual
execution time in milliseconds to the transcript), invokes your
`stretchInterval` once with that fn plus the case's `delay` and
`period`, schedules `stretchCancel(id)` at the case's `cancelTimeMs`,
then drains every scheduled timer to completion — earliest deadline
first, ties broken by scheduling order, which is exactly how Node
drains its timer phase. The interval's first timer registers before
the cancel timeout, while every later tick of a linear pattern has to
be re-scheduled as a fresh one-shot timer; a re-scheduled tick whose
new deadline lands exactly on `cancelTimeMs` therefore loses that tie
to the cancel timeout and is cleared unrecorded. That recorded
transcript is the judged answer shown as Output below. Real elapsed
time has no influence on anything. Never bypass the timers: only
executions scheduled through `setTimeout` and cancelled through
`clearTimeout` count — do not synchronously simulate future ticks, no
`setImmediate`, no busy waits. A fired or already-cleared handle
clears harmlessly, so stopping twice must stay a no-op.

### Example 1

```text
Input: delay = 30, period = 10, cancelTime = 90
Output: [30,70]
Explanation:
30 + 10 * 0 = 30  // the 1st call runs 30ms in
30 + 10 * 1 = 40  // 30ms + 40ms = 70ms - 2nd call
// the next gap (50ms) would land at 120ms, past the 90ms cancel
```

### Example 2

```text
Input: delay = 120, period = 60, cancelTime = 450
Output: [120,300]
Explanation:
120 + 60 * 0 = 120 // 120ms - 1st call
120 + 60 * 1 = 180 // 120ms + 180ms = 300ms - 2nd call
// the next gap (240ms) would land at 540ms, past the 450ms cancel
```

### Example 3

```text
Input: delay = 200, period = 100, cancelTime = 250
Output: [200]
Explanation: Only the opening call at 200ms beats the cancel; the
following gap (300ms) would land at 500ms, long after the 250ms
clear.
```

### Constraints

- `20 <= delay, period <= 250`
- `20 <= cancelTime <= 1000`
