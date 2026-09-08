# Currying In Batches

## Description

Handed a function `fn`, build its curried counterpart.

A curried function takes at most as many arguments per call as the original
does, and each call either hands back another curried stage or, once enough
arguments have accumulated, produces exactly what the original function
would have returned.

Concretely, if the original is invoked as `sum(1, 2, 3)`, its curried form
supports `csum(1)(2)(3)`, `csum(1)(2, 3)`, `csum(1, 2)(3)`, and
`csum(1, 2, 3)` alike — every one of those routes must land on the same
value the original returns.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`applyCurried(batchCase)`, where `batchCase` is a bundle-provided
`BatchCase` carrying `.fn`, the callable built from the case's function
source, and `.inputs`, the ordered argument batches. Inside `applyCurried`
you provide the real deliverable — a local `curry(fn)` — then drive it:
start from `curry(batchCase.fn)` and replace the current stage with
`stage(...batch)` for each batch in `.inputs`, in order. The final stage's
value is the judged output; under this problem's guarantees every sequence
terminates in the original function's return value rather than a callable.

### Example 1

```text
Input:
fn = function volume(w, h, d) { return w * h * d; }
inputs = [[4, 5, 2]]
Output: 40
Explanation:
The code being executed is:
const curriedVolume = curry(fn);
curriedVolume(4, 5, 2)
Feeding everything at once is allowed, and it answers the same as
volume(4, 5, 2) — 40.
```

### Example 2

```text
Input:
fn = function add2(a, b) { return a + b; }
inputs = [[6], [7]]
Output: 13
Explanation:
curriedAdd2(6)(7) should return the same value as add2(6, 7). Each call
supplies one argument, and the second call completes the pair.
```

### Example 3

```text
Input:
fn = function product(a, b, c) { return a * b * c; }
inputs = [[], [], [2, 3, 4]]
Output: 24
Explanation:
Calls may carry nothing at all: the two empty batches hand back equivalent
stages, and the last call carries the full payload, matching
product(2, 3, 4) — 24.
```

### Example 4

```text
Input:
fn = function beat() { return 90; }
inputs = [[]]
Output: 90
Explanation:
Currying a function that takes no parameters should effectively do nothing:
curriedBeat() === 90.
```

### Constraints

- `1 <= inputs.length <= 1000`
- `0 <= inputs[i][j] <= 10⁵`
- `0 <= fn.length <= 1000`
- `inputs.flat().length == fn.length`
- `function parameters explicitly defined`
- `If fn.length > 0 then the last array in inputs is not empty`
- `If fn.length === 0 then inputs.length === 1`

## Hints

### Hint 1

`fn.length` reports how many explicitly declared parameters the target
expects.

### Hint 2

Collect arguments across calls. Once the running total reaches
`fn.length`, pass everything to `fn`; until then, hand back a function
that remembers what has arrived so far and keeps collecting.
