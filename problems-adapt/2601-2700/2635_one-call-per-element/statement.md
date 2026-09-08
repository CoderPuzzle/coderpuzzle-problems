# One Call Per Element

## Description

Given an integer array `arr` and a mapping function `fn`, build a new array
in which every element has been replaced by its transformation.

The result must satisfy `returnedArray[i] = fn(arr[i], i)` at every index —
each output slot is the outcome of exactly one call.

The built-in `Array.map` method is off limits.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(morphCase)`, where `morphCase` is a bundle-provided `MorphCase`
carrying `.arr`, the integer array under test, and `.fn`, the callable
built from the case's function source. Walk the array with your own loop
and build a new array whose entry at index i is `fn(arr[i], i)`, always
passing both arguments positionally; every position of the result comes
from its own call, whatever value it yields. The judged answer is exactly
that returned array.

### Example 1

```text
Input: arr = [2,4,6,8], fn = function triple(n) { return n * 3; }
Output: [6,12,18,24]
Explanation:
const morphed = map(arr, triple); // [6,12,18,24]
The function multiplies each value in the array by three.
```

### Example 2

```text
Input: arr = [5,10,15,20], fn = function minusIndex(n, i) { return n - i; }
Output: [5,9,13,17]
Explanation: The function subtracts the index each value resides at.
```

### Example 3

```text
Input: arr = [7,8,9], fn = function fixed() { return 5; }
Output: [5,5,5]
Explanation: The function ignores its input and always returns 5.
```

### Constraints

- `0 <= arr.length <= 1000`
- `-10⁹ <= arr[i] <= 10⁹`
- `fn returns an integer.`

## Hints

### Hint 1

Create the array you intend to return before you fill it.

### Hint 2

Walk the given array element by element, pushing `fn(arr[i])` — or
`fn(arr[i], i)` when the function wants the index too — onto the result.
