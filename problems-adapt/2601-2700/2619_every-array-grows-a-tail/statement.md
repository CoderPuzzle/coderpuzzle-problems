# Every Array Grows A Tail

## Description

Teach every array a new `last()` method: the call returns the array's
final element, and `-1` when the array holds nothing at all.

Arrays arrive as the output of `JSON.parse`, so an element can be any
JSON value — a number, string, boolean, null, or a nested array or
object.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(tailProbe)`, where `tailProbe` is a bundle-provided `TailProbe`
carrying `.nums`, the case's array. Add `last` to `Array.prototype`
first, then invoke `tailProbe.collect()` once — that call checks your
enhancement against fresh probe arrays of its own, so a submission that
never defined `last` (or faked it onto the one case array as an own
property) fails right there. The verdict, read after `solve` returns, is
a three-entry transcript: the case array itself, an untouched clone of
it, and an empty array. That transcript is the judged answer. Since `-1`
is also the empty-array sentinel, a caller cannot tell a genuine final
element of `-1` apart from an empty input; the rule stands as stated.

### Example 1

```text
Input: nums = [false, "done", 41]
Output: [41, 41, -1]
Explanation: The case array ends in 41, its clone ends in 41 too, and the
empty probe has nothing to hand back.
```

### Example 2

```text
Input: nums = [{"id": 2}]
Output: [{"id": 2}, {"id": 2}, -1]
Explanation: A one-element array's last element is that element, objects
included.
```

### Example 3

```text
Input: nums = []
Output: [-1, -1, -1]
Explanation: With no elements anywhere, every probe lands on the -1
sentinel.
```

### Constraints

- The case array is a valid JSON array; its elements may be any JSON
  values.
- `0 <= arr.length <= 1000`.

## Hints

### Hint 1

Inside a function assigned to `Array.prototype`, the `this` keyword is
the array the call arrived on.

### Hint 2

`this.length` and ordinary index reads are all the machinery needed.
