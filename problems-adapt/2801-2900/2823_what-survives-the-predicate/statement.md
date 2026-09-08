# What Survives The Predicate

## Description

Given an object or an array `obj` and a function `fn`, return a
filtered object or array.

Function `deepPrune` should run a deep filter over `obj`: every value
for which `fn` returns false is removed, and so is any object or array
left empty once its own members have been filtered.

If the whole operation strips everything out — nothing remains at the
root — `deepPrune` should return `undefined` to signal that no valid
data survived.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission
declares the function `deepPrune(obj, fn)` plus a class `Solution`
whose `solve(pruneCase)` hands that function to the bundle-provided
case carrier: `pruneCase.drive(deepPrune)`. Each case carries a JSON
value `obj` and a function source `fn`; the driver builds the callable
from that source, calls your `deepPrune` with `(obj, fn)` once, and
records the answer — the returned object or array itself, compared
exactly, or JSON `null` when your function returns `undefined` because
nothing survived. That recorded value is what the judge scores.

### Example 1

```text
Input:
obj = {"menu": {"hot": ["tea","coffee"], "cold": {"cola": 0, "juice": 1}}, "flag": "yes", "n": 7},
fn = (x) => typeof x === "string"
Output: {"menu":{"hot":["tea","coffee"]},"flag":"yes"}
Explanation: Only string values keep their place. `cold` ends up
empty once its numbers are gone, so it disappears, taking `menu`'s
other branch with it.
```

### Example 2

```text
Input:
obj = [1, [2, [3, "x"], 4], "y", [[], {}], "z"],
fn = (x) => typeof x === "string"
Output: [[["x"]],"y","z"]
Explanation: The strings survive at their nesting depth; the arrays
that held only non-strings prune away to nothing and drop out.
```

### Example 3

```text
Input:
obj = {"a": {"b": {"c": -1}}, "d": 0},
fn = (x) => x > 0
Output: undefined
Explanation: No leaf passes, so every container empties from the
bottom up and nothing is left at the root.
```

### Constraints

- `fn` is a function that returns a boolean value
- `obj` is a valid JSON object or array
- `2 <= JSON.stringify(obj).length <= 10⁵`
