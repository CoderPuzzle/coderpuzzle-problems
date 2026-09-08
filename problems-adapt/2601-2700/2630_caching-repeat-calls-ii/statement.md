# Caching Repeat Calls II

## Description

Given a function `fn`, build the wrapper that caches: a call whose exact
argument list has been seen before is answered from the cache instead of
invoking `fn` again.

The wrapper may be handed any function, with no restrictions on what its
arguments are. Two arguments count as the same one only when they are `===`
to each other — structurally identical objects that happen to be distinct
references are different arguments.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`runMemoized(replayCacheCase)`, where `replayCacheCase` is a
bundle-provided `ReplayCacheCase` carrying `.source`, the source text of
the tested function `fn`, and `.getInputs`, the source text of a
zero-argument function that returns the array of argument lists the cached
wrapper must replay. Inside `runMemoized` you provide the real deliverable
— a local `cacheCalls(fn)` — then materialize both callables, replay every
argument list through your cached wrapper, and return one row per
replayed list:
`{"val": <result>, "calls": <cumulative number of fn() invocations so
far>}`. A row records the result of that replay and how many times your
`fn` had been invoked up to and including it; a correct caching wrapper
triggers at most one new invocation per distinct argument list. Every
returned value on the wire is a valid JSON value.

### Example 1

```text
Input:
getInputs = () => [[3,4],[3,4],[5,7]]
fn = function (a, b) { return a * b - 1; }
Output: [{"val":11,"calls":1},{"val":11,"calls":1},{"val":34,"calls":2}]
Explanation:
The first replay computes 3 * 4 - 1 = 11 and spends one fn() call. The
second replay sees the same pair (3, 4), so the cached 11 comes back
without another call. The third replay is a new pair and pushes the
running total to 2 (5 * 7 - 1 = 34).
```

### Example 2

```text
Input:
getInputs = () => [[[],[]],[[],[]],[[],[]]]
fn = function (a, b) { return a.concat(b); }
Output: [{"val":[],"calls":1},{"val":[],"calls":2},{"val":[],"calls":3}]
Explanation:
Each replay builds fresh array literals, and no two empty arrays are ===
to each other. Every replay therefore misses the cache and invokes fn()
again — three rows, three calls — even though every result looks the same.
```

### Example 3

```text
Input:
getInputs = () => { const a = []; const b = [9]; return [[a,b],[a,b],[a,b]]; }
fn = function (a, b) { return a.concat(b); }
Output: [{"val":[9],"calls":1},{"val":[9],"calls":1},{"val":[9],"calls":1}]
Explanation:
This time every replay passes the exact same two references, so after the
first call computes [9], the second and third replays are cache hits and
fn() is never invoked again.
```

### Constraints

- `1 <= inputs.length <= 10⁵`
- `0 <= inputs.flat().length <= 10⁵`
- `inputs[i][j] != NaN`

## Hints

### Hint 1

Matching JSON.stringify text does not mean two values are ===; only
reference or primitive identity does.

### Hint 2

Scanning every earlier argument list per call works but is far too slow
for the replay sizes here.

### Hint 3

JavaScript `Map`s can key on arbitrary values, which is exactly what the
cache needs.

### Hint 4

Grow a tree of `Map`s, one level per argument position; hang the cached
result off the last level.
