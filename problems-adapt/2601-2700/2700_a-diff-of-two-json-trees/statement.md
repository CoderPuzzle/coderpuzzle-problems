# A Diff Of Two JSON Trees

## Description

Write a function that takes two deeply nested objects or arrays, obj1
and obj2, and describes their differences as a fresh object.

Compare the two structures key by key. The result carries a key only
where the value under that key changed from obj1 to obj2 — and for each
such key the value is the pair `[obj1 value, obj2 value]`. A key that
one side has and the other lacks is not a change: added and removed
keys never appear in the result. Nesting is preserved, so the outcome
is itself a deeply nested object whose every leaf is one such
difference pair.

Arrays compare positionally: an index plays the role of a key.

Both inputs are valid JSON — whatever `JSON.parse` produces.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(treeDiffCase)`, where `treeDiffCase` is a bundle-provided
`TreeDiffCase` carrying `.obj1` and `.obj2`, the two deeply nested
structures under comparison. Implement `treeDiff(obj1, obj2)` per the
rules above, then invoke `treeDiffCase.drive(treeDiff)` once — `drive`
calls your function with the case's pair and records whatever it
returns; that recorded object is the judged answer.

### Example 1

```text
Input:
obj1 = {}
obj2 = {
  "chart": 3,
  "delta": 9
}
Output: {}
Explanation: Nothing was removed from obj1; "chart" and "delta" are new
on the obj2 side, and keys that appear only on one side are ignored.
```

### Example 2

```text
Input:
obj1 = {
  "x": null,
  "y": 3,
  "nest": {
    "deep": "same"
  }
}
obj2 = {
  "x": 0,
  "y": 4,
  "nest": {
    "deep": "same"
  }
}
Output:
{
  "x": [null, 0],
  "y": [3, 4]
}
Explanation: "x" changed from null to 0 and "y" from 3 to 4. "nest" is
omitted entirely: its subtree agrees all the way down, and unchanged
subtrees leave no empty blocks behind.
```

### Example 3

```text
Input:
obj1 = {
  "tag": "t",
  "run": 4,
  "row": [6, 5, 8, [3, 9, 2]]
}
obj2 = {
  "tag": "t",
  "run": 1,
  "row": [6, 5, 0, [4]]
}
Output:
{
  "run": [4, 1],
  "row": {
    "2": [8, 0],
    "3": {
      "0": [3, 4]
    }
  }
}
Explanation: "run" holds different numbers, while "tag" agrees and is
left out. Inside "row", indices act as keys — stringified, since
difference blocks are objects: index 2 changed, and index 3 changed
deeper, with the tail entries of the inner array treated as removed and
therefore absent.
```

### Example 4

```text
Input:
obj1 = {
  "v": {
    "n": 2
  }
}
obj2 = {
  "v": [true]
}
Output:
{
  "v": [{"n": 2}, [true]]
}
Explanation: The key "v" exists on both sides, but an object can never
pair with an array — a container-kind or primitive-kind split is
reported as one whole-value difference.
```

### Constraints

- obj1 and obj2 are valid JSON objects or arrays
- `2 <= JSON.stringify(obj1).length <= 10⁴`
- `2 <= JSON.stringify(obj2).length <= 10⁴`

## Hints

### Hint 1

Only keys (or indices) present on both sides can produce output — walk
the intersection, not the union.

### Hint 2

Recurse through shared containers: when both values under a key are
objects, or both are arrays, the comparison continues one level down
instead of reporting the pair.

### Hint 3

A subtree that yields nothing contributes nothing — attach a nested
block only when at least one leaf under it actually differs.
