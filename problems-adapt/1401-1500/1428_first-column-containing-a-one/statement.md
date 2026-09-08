# First Column Containing a One

## Description

This is an **interactive** problem.

The judge holds a grid of `0`s and `1`s whose every row is sorted in
non-decreasing order — each row is some run of `0`s followed by some run of
`1`s, and different rows may switch at different places (a row may also be
all `0`s or all `1`s). Return the smallest (0-based) column index that holds
a `1` in at least one row, or `-1` if the grid contains no `1` at all.

The grid itself is off limits — your only access is the `BitMatrix` object
handed to your method:

- `get(row, col)` — the entry at row `row`, column `col` (both 0-indexed).
- `dimensions()` — the pair `[rows, cols]`.

Calling `get` more than **1000 times** is judged wrong; `dimensions()` costs
nothing.

**Note (CoderPuzzle):** the signature is `firstColumnWithOne(matrix)`.

### Example 1

```text
Input: matrix = [[0,0,1],[0,1,1]]
Output: 1
Explanation: Row 0 carries its first 1 at column 2 and row 1 at column 1, so
column 1 is the leftmost one that lights up.
```

### Example 2

```text
Input: matrix = [[1,1],[0,1]]
Output: 0
Explanation: Row 0 starts with a 1, and no column can beat column 0.
```

### Example 3

```text
Input: matrix = [[0,0,0]]
Output: -1
Explanation: The lone row is all zeros, so no column contains a 1.
```

### Constraints

- `1 <= rows, cols <= 100`
- Every entry is `0` or `1`.
- Every row is sorted in non-decreasing order.
- No more than 1000 calls to `get`.

## Hints

### Hint 1

Each row is a block of `0`s then a block of `1`s, so the only fact worth
knowing about a row is where its first `1` sits — and the answer is the
minimum of those positions. A per-row binary search finds them all in about
`rows · log cols` calls, already inside the budget for a 100 x 100 grid.

### Hint 2

There is a sharper walk: begin at the **top-right** corner. On a `1`, note
the column and move left (this row cannot improve the answer further left);
on a `0`, move down (nothing right of here in this row matters).

### Hint 3

The pointer only travels left and down, so the whole walk finishes within
`rows + cols - 1` calls — never more than 199 for the largest grid — and
the column where it last saw a `1` is the leftmost such column.
