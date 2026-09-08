# Ordering A List By A Key Function

## Description

Given an array arr and a function fn, arrange the array so its elements
appear in ascending order of fn's output, and return the arranged array
as sortedArr. fn returns a number for every element, and those numbers
alone decide placement: the element with the smallest key comes first,
the largest key comes last.

You may rely on fn never producing the same number twice for one array,
so no two elements ever tie.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your entry point is a class `Solution` with `run(orderCase)`; inside
it, call `orderCase.check(this)`. The bundle-provided case carrier then
hands your `orderBy(arr, fn)` method this case's array together with the
callable built from the case's function source text, and compares your
returned array against the expected ascending order right inside the
harness — element-for-element, in order, where object elements compare
structurally regardless of key order. You may sort in place or build a
fresh array; only the returned array is judged.

### Example 1

```text
Input: arr = [12, -3, 7, 0], fn = (v) => v * 3
Output: [-3, 0, 7, 12]
Explanation: fn triples each element, and tripling keeps the original
order intact, so the array simply ends up ascending.
```

### Example 2

```text
Input: arr = [{"score": 82}, {"score": 47}, {"score": 95}], fn = (r) => 100 - r.score
Output: [{"score": 95}, {"score": 82}, {"score": 47}]
Explanation: fn maps a record to 100 minus its score, so bigger scores
earn smaller keys and the records come out highest-score first.
```

### Example 3

```text
Input: arr = [[6, 1], [2, 9], [8, 4]], fn = (pair) => pair[0] - pair[1]
Output: [[2, 9], [8, 4], [6, 1]]
Explanation: fn reads the gap between a pair's two slots — 5, -7, and 4 —
so [2, 9] with key -7 leads and [6, 1] with key 5 closes the order.
```

### Constraints

- arr is a valid JSON array
- fn is a function that returns a number
- fn never returns the same number twice for one array
- 1 <= arr.length <= 5 * 10⁵
