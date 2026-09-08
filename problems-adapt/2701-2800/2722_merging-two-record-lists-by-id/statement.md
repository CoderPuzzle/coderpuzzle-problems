# Merging Two Record Lists By Id

## Description

Two arrays of records, arr1 and arr2, are given. Every object in either
array carries an `id` field with an integer value, and an id never repeats
within one array. Build the id-keyed merge of the two arrays: one array
that contains every distinct id appearing in either input exactly once,
ordered by ascending id.

When an id exists in only one of the arrays, its object is carried into
the result unchanged. When the same id appears in both arrays, the two
objects combine into a single one:

- A key that only one of the two objects has keeps that object's value.
- A key both objects have takes the value held by the arr2 object.

Combining is shallow: a shared key's value is adopted wholesale, so an
object or array sitting behind it is replaced as a whole rather than
fused key-by-key with its counterpart.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your entry point is a class `Solution` with `run(caseRunner)`; inside
it, call `caseRunner.check(this)`. The bundle-provided case runner then
hands your `mergeById(arr1, arr2)` method fresh copies of both arrays and
compares your returned array against the expected merge right inside the
harness, element by element: the outer array must follow the ascending id
order above, key order inside each merged object never matters, and any
JSON value — `null`, booleans, numbers, strings, or nested containers,
which are replaced whole rather than combined — may sit behind any key.

### Example 1

```text
Input:
arr1 = [
    {"id": 5, "kind": "apple"},
    {"id": 2, "kind": "pear"}
],
arr2 = [
    {"id": 9, "kind": "fig"}
]
Output:
[
    {"id": 2, "kind": "pear"},
    {"id": 5, "kind": "apple"},
    {"id": 9, "kind": "fig"}
]
Explanation: The three ids are distinct, so every object is carried over
unchanged and the result is ordered by ascending id.
```

### Example 2

```text
Input:
arr1 = [
    {"id": 4, "qty": 3, "meta": {"bin": "A1"}}
],
arr2 = [
    {"id": 4, "meta": {"bin": "C7"}, "flag": true},
    {"id": 1, "qty": 0}
]
Output:
[
    {"id": 1, "qty": 0},
    {"id": 4, "qty": 3, "meta": {"bin": "C7"}, "flag": true}
]
Explanation: Id 1 exists only in arr2 and is kept as is. The two id-4
objects merge: "meta" exists on both sides, so arr2's whole {"bin": "C7"}
displaces arr1's, "flag" is new from arr2, and "qty" survives from arr1.
```

### Example 3

```text
Input:
arr1 = [
    {"id": 7, "deep": {"x": [1, 2]}, "keep": "yes"}
],
arr2 = [
    {"id": 7, "deep": {"y": 0}}
]
Output:
[
    {"id": 7, "deep": {"y": 0}, "keep": "yes"}
]
Explanation: The shared key "deep" takes arr2's value wholesale — the
nested {"x": [1, 2]} tree is replaced, not combined — while "keep", which
only arr1 has, rides along.
```

### Constraints

- arr1 and arr2 are valid JSON arrays
- Each object in arr1 and arr2 has a unique integer id key
- 2 <= JSON.stringify(arr1).length <= 10⁶
- 2 <= JSON.stringify(arr2).length <= 10⁶
