# A Generator That Flattens

## Description

Take a multi-dimensional array of integers and expose its contents
through a generator that yields the integers one by one in the order a
depth-first, left-to-right walk reaches them.

A multi-dimensional array is a recursive shape: each of its elements is
either an integer or another multi-dimensional array. The walk visits
each array's elements from left to right, yielding every integer it
meets and descending into every array it meets the same way.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — no other language is offered for it. Your submission declares
`function* yieldFlat(arr)` at top level; the generated `class Solution`
keeps its `run(nestCase)` method, whose body hands your generator
function to the bundle-provided driver: `nestCase.drive(yieldFlat)`. The
driver calls your function once with the case's nested array `.arr`,
then repeatedly calls `.next()` on the returned generator object until
it reports `done`, recording every yielded integer in arrival order as
the judged output shown as Output below.

### Example 1

```text
Input: arr = [3,[8,[2]],9]
Output: [3,8,2,9]
Explanation:
const generator = yieldFlat(arr);
generator.next().value; // 3
generator.next().value; // 8
generator.next().value; // 2
generator.next().value; // 9
generator.next().done; // true
```

### Example 2

```text
Input: arr = [[],[4,[]],[[7]],5]
Output: [4,7,5]
Explanation: Empty arrays contribute nothing; the walk yields 4,
descends twice to reach 7, then finishes with the trailing 5.
```

### Example 3

```text
Input: arr = [1,[2,[3,[4]]]]
Output: [1,2,3,4]
Explanation: One nested chain four levels deep unwinds strictly from
the outside in.
```

### Constraints

- `0 <= arr.flat().length <= 10⁵`
- `0 <= arr.flat()[i] <= 10⁵`
- `maxNestingDepth <= 10⁵`

### Follow up

Can you make the generator work without ever materializing a flattened
copy of the array?

## Hints

### Hint 1

One generator can hand control to another with the `yield*` syntax.

### Hint 2

A generator may also delegate to itself, recursing into each sub-array
it encounters.

### Hint 3

Recursion depth is not a concern you need to engineer around here.
