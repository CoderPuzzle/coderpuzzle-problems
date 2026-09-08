# Count Hidden Ships in a Rectangle

## Description

This is an **interactive** problem.

A number of ships sit on integer points of a flat coordinate grid, at most
one ship per point. You are handed two opposite corners of an axis-aligned
rectangle and must report **how many ships lie inside it**, boundary points
included. The catch is that the layout is invisible: the positions live only
inside the judge, and everything you learn about them arrives through the
`Ocean` object passed to your method:

- `hasShips(topRight, bottomLeft)` — answers whether the closed rectangle
  with those opposite corners contains at least one ship. Each corner is a
  two-element array `[x, y]`.

A submission that calls `hasShips` more than **400 times** is judged wrong,
and any attempt to work around the judge is disqualified.

The queried rectangle is guaranteed to hold **at most 10 ships** — without
that promise, no approach could finish inside the budget.

**Note (CoderPuzzle):** the signature is `countHiddenShips(ocean, topRight,
bottomLeft)`; corners arrive as plain `[x, y]` pairs, not as a point class.
The queried box may be a single row, a single column, or a lone point.

### Example 1

```text
Input: ships = [[0,0],[2,3],[3,1],[6,7]], topRight = [4,4], bottomLeft = [0,0]
Output: 3
Explanation: The first three ships fall inside the queried box; the ship at [6,7] lies outside it.
```

### Example 2

```text
Input: ships = [[7,2],[2,8]], topRight = [9,9], bottomLeft = [1,1]
Output: 2
Explanation: Both ships are inside the queried box.
```

### Example 3

```text
Input: ships = [[3,5]], topRight = [3,5], bottomLeft = [3,5]
Output: 1
Explanation: The box shrinks to the lone point [3,5], and that point carries a ship.
```

### Constraints

- On the input, the ship positions only initialize the judge's state; your
  method never sees them.
- `0 <= bottomLeft[0] <= topRight[0] <= 1000`
- `0 <= bottomLeft[1] <= topRight[1] <= 1000`
- No more than 10 ships sit inside the queried rectangle.
- No more than 400 calls to `hasShips`.

## Hints

### Hint 1

A single `hasShips` reply of `false` discards every point of a whole
rectangle at once. That is the only leverage on offer, so spend queries on
regions, never on individual points.

### Hint 2

Cut the rectangle into four quadrants around its midpoint and descend only
into the ones that answer `true`. A region shrunk to one point that still
answers `true` holds exactly one ship — count it and stop.

### Hint 3

With no more than 10 ships in play, at most 10 regions per recursion level
can answer `true`, and a coordinate span of 1000 halves away in about ten
levels. Mind the degenerate split: an odd-length side produces empty child
rectangles, and those must be rejected before any query is spent on them.
