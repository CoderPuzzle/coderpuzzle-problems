# A Pack Of Numbers

## Description

Design a `NumberPack` class whose constructor takes an array of
integers. An instance only needs to do two things well:

- Adding two packs together with the `+` operator produces the sum of
  every element across both packs.
- Passing an instance through `String()` renders a bracketed,
  comma-separated listing of its elements — `[1,2,3]` for the elements
  1, 2, and 3.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(packCase)`, where `packCase` is a bundle-provided `PackCase`
carrying `.arrays`, the constructor arguments for the NumberPack
instance(s) under test, and `.operation`, either `"Add"` or `"String"`.
Implement NumberPack exactly as described — addition behavior via
valueOf, string conversion via toString — then apply the requested
operation: an `"Add"` case provides two or more instances to be added
together left-to-right with +, while a `"String"` case provides exactly
one instance whose string conversion must be returned.

### Example 1

```text
Input: arrays = [[8, 12], [5, 40, 7]], operation = "Add"
Output: 72
Explanation:
const one = new NumberPack([8, 12]);
const two = new NumberPack([5, 40, 7]);
one + two; // 72, every element of both packs summed
```

### Example 2

```text
Input: arrays = [[9, 0, 14]], operation = "String"
Output: "[9,0,14]"
Explanation:
const pack = new NumberPack([9, 0, 14]);
String(pack); // "[9,0,14]", the elements joined with commas in brackets
```

### Example 3

```text
Input: arrays = [[], [3, 3], []], operation = "Add"
Output: 6
Explanation: Empty packs contribute nothing, so the left-to-right sum
over all three instances is 6.
```

### Constraints

- `0 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- nums is the array handed to the constructor
