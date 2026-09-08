# Doze For Millis

## Description

Given a positive integer `millis`, author an asynchronous function that
holds off for `millis` milliseconds before settling. Whatever it resolves
with is up to you — the value is never looked at.

Small timing drift around `millis` is tolerated.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`run(pauseProbe)`, where `pauseProbe` is a bundle-provided `PauseProbe`
carrying `.millis`, the integer above. Define `async function doze(millis)`
at top level with that shape — it must return a Promise that settles no
earlier than `millis` milliseconds after the call. Let `run` await it with
`await pauseProbe.measure(doze)`: the driver times the awaited call,
rejects the case if the promise lands more than 25 ms early, and on
success records one `"resolved"` row — that row is the judged answer.
Overshooting is watched only by the judge's own clock, since every case
shares the bundle time limit.

### Example 1

```text
Input: millis = 45
Output: [["resolved"]]
Explanation: The promise settles once at least 45 ms have gone by, and
the driver logs the one sanctioned row.
```

### Example 2

```text
Input: millis = 640
Output: [["resolved"]]
Explanation: The same hold, just longer; the recorded answer looks
identical because the resolved value is never inspected.
```

### Constraints

- `1 <= millis <= 1000`
- Settling before `millis - 25` milliseconds fails the case; drifting a
  little past `millis` is acceptable within the judge clock.

## Hints

### Hint 1

JavaScript can schedule work for later with `setTimeout(fn, delay)`.

### Hint 2

An async function is one that hands back a Promise.

### Hint 3

`new Promise((resolve, reject) => {})` builds a promise; calling
`resolve(value)` inside the callback settles it.
