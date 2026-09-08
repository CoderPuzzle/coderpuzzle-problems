# Tabulating The Records

## Description

Write a function `tabulateRecords(arr)` that turns an array of records
`arr` into a table `t`.

Every element of `arr` is an object or an array, and either kind may nest
other objects and arrays arbitrarily deeply; leaves are the scalars —
numbers, strings, booleans, and null.

Row zero of the table holds the column names. When nothing nests, the
columns are just the distinct keys found across the records; with
nesting, each column is the full path to a leaf, joined with `"."`. The
rest of the table has one row per record, and a row's cell for a column
carries that record's value at that path — or the empty string `""` when
the record has no value there.

Columns appear in lexically ascending order.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function tabulateRecords(arr)` with the
behavior above; the generated `class Solution` keeps its
`run(tableProbe)` method, whose body hands your function to the
bundle-provided driver: `tableProbe.drive(tabulateRecords)`. The driver
calls your function once with the case's array `.arr`; whatever table
comes back is recorded by the driver as the judged output shown as
Output below. Arrays count as objects too, keyed by their indices as
strings; only scalars terminate a path, so empty objects or arrays
contribute no columns.

### Example 1

```text
Input:
arr = [
  {"x": true, "y": 0},
  {"x": "", "z": null}
]
Output:
[
  ["x", "y", "z"],
  [true, 0, ""],
  ["", "", null]
]
Explanation: The records share column "x"; one has "y" and the other
"z", so the table gains all three columns. Falsy leaves — true's
neighbors 0 and "", plus null — are genuine values and must not be
confused with a missing cell.
```

### Example 2

```text
Input:
arr = [
  {"cfg": {"retries": 3, "name": "api"}},
  {"cfg": {"retries": 1}}
]
Output:
[
  ["cfg.name", "cfg.retries"],
  ["api", 3],
  ["", 1]
]
Explanation: Both records reach their values through the nested "cfg"
object, so the columns are the paths "cfg.name" and "cfg.retries". The
second record never sets "cfg.name", so that cell is "".
```

### Example 3

```text
Input:
arr = [
  ["p", "q"],
  [7, false]
]
Output:
[
  ["0", "1"],
  ["p", "q"],
  [7, false]
]
Explanation: A top-level array is a record too, keyed by index — the
paths here are "0" and "1".
```

### Example 4

```text
Input:
arr = [
  {"k": [10, {"m": 5}]},
  {}
]
Output:
[
  ["k.0", "k.1.m"],
  [10, 5],
  ["", ""]
]
Explanation: Nesting can pass through an array: index segments and key
segments chain into one path. The second record is empty, so its row is
all "".
```

### Constraints

- `arr` is a valid JSON array
- `1 <= arr.length <= 1000`
- `unique keys <= 1000`

## Hints

### Hint 1

Split the work in two: first turn each record into a flat mapping from
path to value, then build the table from those mappings.

### Hint 2

One record flattens with a worklist of (container, path-so-far) pairs —
objects contribute their keys as the next segment, arrays their indices,
and a scalar ends the path.

### Hint 3

The header is the sorted union of every path seen in any record. When
reading rows back out, test key membership rather than truthiness —
false, 0, "", and null are all real cell values.
