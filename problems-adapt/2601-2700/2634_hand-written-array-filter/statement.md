# Hand-Written Array Filter

## Description

Given an integer array `arr` and a filtering function `fn`, build a new
array holding only the elements that pass the filter.

`fn` receives one or two arguments:

    arr[i] — the element at index i
    i — that element's index

An element `arr[i]` joins the result exactly when the call `fn(arr[i], i)`
comes back truthy — that is, when `Boolean(value)` of the call's result is
true. Surviving elements keep their original order.

The built-in `Array.filter` method is off limits.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(pickCase)`, where `pickCase` is a bundle-provided `PickCase`
carrying `.arr`, the integer array under test, and `.fn`, the callable
built from the case's function source. Walk the array with your own loop,
call `fn(arr[i], i)` for every index i, and return a new array holding
only the elements whose call result is truthy (`Boolean(result)` would be
true), in their original order. Always pass both arguments positionally —
fns in the corpus may read either argument, the index, or both. The judged
answer is exactly that returned array.

### Example 1

```text
Input: arr = [5,12,8,130,44], fn = function atLeastTwelve(n) { return n >= 12; }
Output: [12,130,44]
Explanation:
const picked = filter(arr, fn); // [12, 130, 44]
The function drops every value below twelve.
```

### Example 2

```text
Input: arr = [9,4,7,4,5], fn = function evenSlot(n, i) { return i % 2 === 0; }
Output: [9,7,5]
Explanation:
fn may also read the index of each element.
Here the function keeps only the elements sitting at even indices.
```

### Example 3

```text
Input: arr = [-3,-1,0,1,3], fn = function doubled(n) { return n * 2 }
Output: [-3,-1,1,3]
Explanation:
Falsy results — 0 among them — drop their elements, and the survivors are
the original array values, not the fn results.
```

### Constraints

- `0 <= arr.length <= 1000`
- `-10⁹ <= arr[i] <= 10⁹`

## Hints

### Hint 1

Begin with an empty result array; it is what you will return.

### Hint 2

JavaScript judges conditions by truthiness: `0`, `NaN`, `""`, `undefined`,
`null`, and `false` are falsy, and nearly everything else — including
objects and arrays — is truthy. The test inside an `if` never has to be a
boolean.

### Hint 3

Loop over the array and push `arr[i]` whenever `fn(arr[i], i)` reads as
truthy.
