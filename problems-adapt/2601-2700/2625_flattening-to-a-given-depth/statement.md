# Flattening To A Given Depth

## Description

You are handed an array whose elements may themselves be arrays, which may
again contain arrays, to any depth, along with a depth budget `n`. Return a
new array in which every sub-array sitting shallower than the budget has
been spliced into its parent, its elements taking its place in order.

Nesting depth is counted from the outside in: the elements of the array you
are given sit at depth 0, elements of a first-level sub-array sit at depth
1, and so on. A sub-array at depth `d` is expanded only when `d < n`; once
the budget runs out, a sub-array — and everything inside it, however deep —
travels into the result exactly as it stands. Plain numbers are copied into
the result in the order they are met.

Solve it without reaching for the built-in `Array.flat` method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function flattenToDepth(arr, depth)` with
the behavior above; the generated `class Solution` keeps its
`run(flattenToDepthCase)` method, whose body hands your function to the
bundle-provided driver: `flattenToDepthCase.drive(flattenToDepth)`. The
driver calls your function once with the case's nested array `.arr` and
budget `.n`, and records whatever array comes back as the judged output
shown below.

### Example 1

```text
Input
arr = [8, [3, 9], [1, [6, 2]]]
n = 1
Output
[8, 3, 9, 1, [6, 2]]
Explanation
Both first-level sub-arrays sit at depth 0, and 0 < 1, so each is expanded
in place. The inner [6, 2] lives at depth 1, and 1 is not less than 1, so
it survives whole.
```

### Example 2

```text
Input
arr = [8, [3, 9], [1, [6, 2]]]
n = 0
Output
[8, [3, 9], [1, [6, 2]]]
Explanation
A budget of 0 expands nothing: the shallowest a sub-array can sit is depth
0, and 0 < 0 is false, so the array comes back exactly as it arrived.
```

### Example 3

```text
Input
arr = [[4, [5, [6, [7]]]], 2, [0]]
n = 3
Output
[4, 5, 6, [7], 2, 0]
Explanation
Sub-arrays at depths 0, 1, and 2 all clear the budget and are peeled open,
each contributing its elements in order. The innermost [7] sits at depth 3,
so it is the one piece left standing.
```

### Constraints

- `0 <= count of numbers in arr <= 10⁵`
- `0 <= count of subarrays in arr <= 10⁵`
- `maxDepth <= 1000`
- `-1000 <= each number <= 1000`
- `0 <= n <= 1000`

## Hints

### Hint 1

Walk the structure with a running depth, either by recursion or by keeping
`(element, depth)` pairs on your own stack.

### Hint 2

An element that is an array and whose depth is still under the budget goes
back into the worklist one level deeper; everything else drops straight
into the result.
