# Holding Each Promise Back

## Description

Given an array `functions` of functions that return promises, plus a
number `ms`, return a new array of functions.

Every function in the returned array should give back a promise that
settles exactly `ms` milliseconds later than the original would have —
an extra hold applied to the resolution as well as to the rejection —
while the new array keeps the original functions' order.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of
real timers — the bundle-provided `HoldCase` carries `.fns`, the
callables built from the case's function sources (each returns a
promise), plus `.ms`, and both the function internals and your
implementation arm their delays against the same virtual clock because
`setTimeout` itself is captured by the harness. Your submission defines
`holdAll(functions, ms)` and declares a class `Solution` whose
`run(holdCase)` hands that function over with `return
holdCase.drive(holdAll)`; the driver builds the delayed function array,
invokes each returned function exactly once in original order at
virtual time 0, waits until every delayed promise settles, and compares
the settlement timestamps (in virtual milliseconds, one per input
function, in original order) against the expected arrays below.
Resolution and rejection are judged identically — the transcript only
records when each promise settled, never with what — so a promise whose
source rejects still contributes its settle timestamp.

### Example 1

```text
Input:
functions = [
   () => new Promise((resolve) => setTimeout(resolve, 40))
],
ms = 25
Output: [65]
Explanation: The promise from the array would have settled after
40 ms, but it is held back 25 ms more, thus 40 ms + 25 ms = 65 ms.
```

### Example 2

```text
Input:
functions = [
    () => new Promise((resolve) => setTimeout(resolve, 15)),
    () => new Promise((resolve) => setTimeout(resolve, 45)),
    () => new Promise((resolve) => setTimeout(resolve, 5))
],
ms = 60
Output: [75,105,65]
Explanation: The three promises would have settled after 15 ms, 45 ms
and 5 ms; each is delayed by 60 ms, thus 75 ms, 105 ms and 65 ms.
```

### Example 3

```text
Input:
functions = [
    () => new Promise((resolve, reject) => setTimeout(reject, 25)),
    () => new Promise((resolve) => setTimeout(resolve, 80))
],
ms = 35
Output: [60,115]
Explanation: A rejection is held back the same way — the first
promise still settles at 25 + 35 = 60 ms.
```

### Constraints

- functions is an array of functions that return promises
- 10 <= ms <= 500
- 1 <= functions.length <= 10
