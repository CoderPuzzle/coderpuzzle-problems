# Yielding Around A Circular Array

## Description

A circular array is one whose two ends meet: stepping forward from the
last slot lands on the first, and stepping backward from the first lands
on the last. Given such an array `arr`, a starting position, and a
sequence of jumps sent in from outside, produce every value the walk
visits.

You write a generator that behaves like this:

- The very first resume — a parameterless `next()` — yields
  `arr[startIndex]`.
- Every later resume is handed one integer jump (as in `next(-3)`), and
  the generator answers with the value at its new position:
    - a positive jump moves the position forward by that many slots, with
      the last slot connecting back to the first;
    - a negative jump moves the position backward by the size of the
      jump, with the first slot connecting forward to the last.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function
`walkCircularArray(arr, startIndex)` and declares a class `Solution`
whose `run(ringWalkCase)` hands that function to the bundle-provided
case carrier: `ringWalkCase.drive(walkCircularArray)`. The carrier calls
`walkCircularArray(arr, startIndex)`, takes the first parameterless
`next()` (which must yield `arr[startIndex]`), then resumes the
generator once per case step via `next(jump)`. The judge compares the
array of collected `.value` numbers — the observed walk — against the
expected list exactly. The generator object itself never crosses the
wire; only its yielded numbers are judged, and a generator that reports
`done` at any point is rejected because the walk never terminates.

### Example 1

```text
Input: arr = [7,9,4,11], steps = [2,3,-5], startIndex = 2
Output: [4,7,11,4]
Explanation:
const gen = walkCircularArray(arr, startIndex);
gen.next().value;  // 4,  index = startIndex = 2
gen.next(2).value; // 7,  index = 0, 2 -> 3 -> 0
gen.next(3).value; // 11, index = 3, 0 -> 1 -> 2 -> 3
gen.next(-5).value // 4,  index = 2, 3 -> 2 -> 1 -> 0 -> 3 -> 2
```

### Example 2

```text
Input: arr = [100], steps = [7,-3,0], startIndex = 0
Output: [100,100,100,100]
Explanation:
A one-slot ring connects to itself in both directions, so every jump —
seven forward, three backward, or none at all — leaves the walk where it
started.
gen.next().value;  // 100, index = 0
gen.next(7).value; // 100
gen.next(-3).value // 100
gen.next(0).value  // 100
```

### Example 3

```text
Input: arr = [5,1,8,6,2], steps = [-1,-6,9], startIndex = 4
Output: [2,6,8,1]
Explanation:
const gen = walkCircularArray(arr, startIndex);
gen.next().value;  // 2, index = 4
gen.next(-1).value // 6, index = 3
gen.next(-6).value // 8, index = 3 -> 2 -> 1 -> 0 -> 4 -> 3 -> 2
gen.next(9).value  // 1, index = 2 -> 3 -> 4 -> 0 -> 1 -> 2 -> 3 -> 4 -> 0 -> 1
```

### Constraints

- `1 <= arr.length <= 10⁴`
- `1 <= steps.length <= 100`
- `-10⁴ <= steps[i], arr[i] <= 10⁴`
- `0 <= startIndex < arr.length`
