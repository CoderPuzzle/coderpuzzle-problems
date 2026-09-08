# Preloading A Function's Arguments

## Description

Given a function `fn` and an array `args`, write `preload(fn, args)` — it
returns a new function that carries `args` preloaded in front of whatever
the caller passes later.

Two rules fix the merged argument list:

- Every top-level `"_"` entry in `args` is a slot: slots are filled from
  the later call's values in order, starting at its first value.
- Whatever values the later call still holds once every slot is filled
  are appended after the merged list, in order.

Calling the returned function then invokes `fn` with the elements of that
merged list passed as separate arguments, and hands back whatever `fn`
returns.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission implements `var preload = function(fn, args) { ... }`,
which returns the merged-call function described above, and declares
`class Solution` with the method `runPartial(preloadCase)`, where
`preloadCase` is a bundle-provided `PreloadCase` carrying `.fn`, the
callable built from the case's function source; `.args`, the prefilled
argument list; and `.restArgs`, the argument list of the single observed
invocation. Build the function from your `preload(fn, args)`, invoke it
with the elements of `restArgs` spread as separate arguments, and return
the call's result. The invoked function may return any JSON value — a
number, string, boolean, array, or object — which is compared against the
expected value exactly.

### Example 1

```text
Input:
fn = (...args) => args.join('-')
args = ["a", "b"]
restArgs = ["c", "d"]
Output: "a-b-c-d"
Explanation: Neither prefilled entry is a slot, so the later values are
simply appended; the merged list "a", "b", "c", "d" goes to fn as four
separate arguments and joins into one string.
```

### Example 2

```text
Input:
fn = (...args) => args
args = [1, "_", 3, "_", 5]
restArgs = [2, 4, 6, 8]
Output: [1, 2, 3, 4, 5, 6, 8]
Explanation: The two slots consume 2 and 4 in order, and the values the
slots never reached (6 and 8) trail the merged list.
```

### Example 3

```text
Input:
fn = (x, y) => x * y
args = ["_"]
restArgs = [6, 7]
Output: 42
Explanation: The single slot takes 6, and the surplus 7 is appended
after it, so the two-parameter function is called as (6, 7) and answers
6 * 7 = 42.
```

### Constraints

- `fn` is a function
- `args` and `restArgs` are valid JSON arrays
- `1 <= args.length <= 5 * 10⁴`
- `1 <= restArgs.length <= 5 * 10⁴`
- `0 <= number of placeholders <= restArgs.length`
