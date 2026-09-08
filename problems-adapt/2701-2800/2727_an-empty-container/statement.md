# An Empty Container

## Description

You are handed one value that came out of `JSON.parse` — always a
JavaScript object or an array, never a scalar. Report whether that
container is empty. An object is empty when it carries no key-value
pairs at all; an array is empty when it holds no elements. Only the
container's own top level matters: an object whose every stored value is
itself an empty container is still nonempty, and so is an array whose
single element is `null` or `0`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Each case stores `obj` as raw JSON text, and the bundle-provided
case carrier runs that text through `JSON.parse` before your code sees
it, so you always receive a genuine JavaScript object or array. Declare
`function isEmpty(obj)` and a class `Solution` whose `isEmpty` method
hands the carrier's value to your function as
`isEmpty(containerCase.obj)`. The boolean your function returns is the
judged answer, compared exactly.

### Example 1

```text
Input: obj = {"greeting": "hi", "count": 7}
Output: false
Explanation: The object holds 2 key-value pairs, so it is not empty.
```

### Example 2

```text
Input: obj = {"slots": []}
Output: false
Explanation: An empty array stored as a value changes nothing — the
object itself has 1 key-value pair, so it is not empty.
```

### Example 3

```text
Input: obj = [0]
Output: false
Explanation: The array holds one element. That the element is falsy is
irrelevant; any element at all makes the array nonempty.
```

### Example 4

```text
Input: obj = []
Output: true
Explanation: The array holds no elements, so it is empty.
```

### Constraints

- `obj` is a valid JSON object or array
- `2 <= JSON.stringify(obj).length <= 10⁵`

### Follow-up

Can you decide this in `O(1)` time?
