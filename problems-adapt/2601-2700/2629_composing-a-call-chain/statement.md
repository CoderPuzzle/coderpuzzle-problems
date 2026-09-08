# Composing A Call Chain

## Description

Given an array of single-argument functions `[f1, f2, ..., fn]`, build the
one function that runs the whole array as a chain: calling it with `x`
evaluates the array from the last entry back to the first, each function
consuming the previous one's result. For `[f, g, h]` the chain computes
`f(g(h(x)))`.

An empty array yields the identity function — the chain of no calls
returns its input unchanged.

Every function in the array takes one integer in and returns one integer
out; the chained function you return does the same.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function chainCalls(functions)` returning
the chained function, plus a class `Solution` whose `run` method hands
your function to the bundle-provided driver:
`callChainCase.drive(chainCalls)`. The driver builds every case's function
from its source text, hands the resulting array of callables to your
`chainCalls`, requires a function back, calls it once at `callChainCase.x`,
and records the returned integer — that recorded value is the judged
answer shown as `Output` below. The driver also keeps a per-function call
count and accepts a case only when every supplied function was called
exactly once, so the returned function must genuinely thread its input
through the whole chain (an empty array makes no calls and must behave as
identity).

### Example 1

```text
Input: functions = [x => x - 2, x => 3 * x], x = 5
Output: 13
Explanation:
Evaluating from right to left ...
Starting with x = 5.
3 * (5) = 15
(15) - 2 = 13
```

### Example 2

```text
Input: functions = [x => x * x, x => x - 6], x = 3
Output: 9
Explanation:
Evaluating from right to left ...
(3) - 6 = -3
(-3) * (-3) = 9
The leftmost function runs last, so the squaring lands on the already
decremented value.
```

### Example 3

```text
Input: functions = [], x = -42
Output: -42
Explanation:
A chain of zero functions is the identity function.
```

### Constraints

- `-1000 <= x <= 1000`
- `0 <= functions.length <= 1000`
- all functions accept and return a single integer

## Hints

### Hint 1

Return a function of one number that yields one number; capture the array
in a closure.

### Hint 2

Inside that function, sweep the array from its last index down to zero,
feeding each result into the next call.
