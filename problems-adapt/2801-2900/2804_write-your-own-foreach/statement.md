# Write Your Own ForEach

## Description

Attach your own `forEach` to every array: after your enhancement, any
array must support `array.forEach(callback, context)`, running
`callback` once per element in ascending order. Like the real method,
yours returns nothing at all.

`callback` is invoked with three arguments:

- `currentValue` — the element being visited on this iteration.
- `index` — the position of that element in the array.
- `array` — the array itself, so the callback can read or rewrite the
  whole thing it is walking.

`context` is the value that must arrive as the callback's function
context: inside the callback, the `this` keyword refers to exactly that
object.

Try to build it without reaching for the built-in array methods.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission
declares `class Solution` with the method `solve(eachCase)`, where
`eachCase` is a bundle-provided `EachCase` carrying `.arr`, the JSON
array under test; `.fn`, the callable built from the case's callback
source; and `.context`, the context object from the Input. Enhance
`Array.prototype` with `forEach(callback, context)` exactly as
described — arrow callbacks in the examples are rewritten once by the
carrier so that `context` truly lands on their `this` — then call
`eachCase.collect()` once: it probes fresh arrays of its own and throws
unless your enhancement passes the full triple, ordering,
context-binding, empty-array, and no-return contract. Finish with
`eachCase.run()`, which refuses the native `Array.prototype.forEach` as
a stand-in, drives this case's array through yours, and records its
final contents. The judged answer is exactly those final contents.

### Example 1

```text
Input:
arr = [3,7,2,9],
callback = (val, i, arr) => arr[i] = val + i,
context = {"k":0}
Output: [3,8,4,12]
Explanation:
arr.forEach(callback, context)
console.log(arr) // [3,8,4,12]

The callback runs on every element, folding its own index into the
value it writes back.
```

### Example 2

```text
Input:
arr = [2,5,8,11],
callback = function (v, i, host) { host[i] = v + this.step; },
context = {"step": 10}
Output: [12,15,18,21]
Explanation:
arr.forEach(callback, context)
console.log(arr) // [12,15,18,21]

Every visit sees the context object as this, so this.step is
available inside the callback.
```

### Example 3

```text
Input:
arr = ["a","b","c"],
callback = function (v, i, host) { host[i] = this.tag + i + v; },
context = {"tag": "#"}
Output: ["#0a","#1b","#2c"]
```

### Constraints

- arr is a valid JSON array
- context is a valid JSON object
- fn is a function
- 0 <= arr.length <= 10⁵
