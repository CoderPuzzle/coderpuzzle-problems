# Sweep the Hidden Room

## Description

This is an **interactive** problem.

Somewhere the judge holds the floor plan of a room: an `m x n` grid in
which every cell is either open or blocked. A cleaning machine stands on
one open cell, facing **up**. You never see the plan — the only thing
your code holds is the `Sweeper` object handed to your method, with four
operations:

- `move()` — step one cell forward. Returns `true` when the cell ahead is
  open and the machine advances into it; returns `false` when the way is
  blocked by a wall or a blocked cell, and the machine stays where it
  stands.
- `turnLeft()` — pivot a quarter turn counter-clockwise, in place.
- `turnRight()` — pivot a quarter turn clockwise, in place.
- `clean()` — clean the cell under the machine.

Your method `sweepRoom` returns nothing. It must instead drive the
machine so that **every open cell reachable from the starting cell ends
up cleaned**: once the method returns, the judge reads back the exact set
of cleaned cells and compares it with the reachable set. Any traversal
that covers them all passes; a single missed cell fails.

**Note (CoderPuzzle):** your method receives the sweeper and nothing else —
the plan, the room's dimensions, and the starting position never reach
your code. Each of the four operations spends one unit of a 200 000-call
budget: generous for a systematic traversal, fatal for wandering.

### Example 1

```text
Input: room = [[1,1,0,1,1,1],[1,1,0,1,0,1],[1,1,1,1,0,1],[0,1,1,1,1,1]], start = [2, 1]
Output: All 19 open cells end up cleaned.
Explanation: 0 marks a blocked cell, 1 an open one. The machine starts
at row 2, column 1; the two wall segments leave a single passage between
the room's halves along the bottom row, and a traversal that backs out of
every dead end reaches all 19 open cells.
```

### Example 2

```text
Input: room = [[1,1,1],[1,1,1],[1,1,1]], start = [1, 1]
Output: All 9 open cells end up cleaned.
Explanation: A fully open square with the machine in the center — every
other cell is a short walk away, and each gets cleaned exactly once.
```

### Example 3

```text
Input: room = [[1,1,1,1],[1,0,0,1]], start = [0, 0]
Output: All 6 open cells end up cleaned.
Explanation: The machine starts in the corner of a ring: the blocked
middle forces every route around the border, and all six open cells lie
on it.
```

### Constraints

- `1 <= m <= 100`, `1 <= n <= 200`.
- Every cell of `room` is open (`1`) or blocked (`0`).
- The starting cell `start = [row, col]` is open, with `0 <= row < m` and
  `0 <= col < n`.
- Every open cell is reachable from the starting cell.
- At most 200 000 sweeper operations.

## Hints

### Hint 1

The machine carries no odometer and no compass readout, but your code
commands every turn, so it can always know where the machine is and which
way it faces: keep coordinates relative to the starting cell and update
them after every successful `move()`.

### Hint 2

Explore like a spiral: from each cell try the four directions in a fixed
clockwise order, descend whenever `move()` succeeds, and record every
cell you enter so that none is ever entered twice.

### Hint 3

When a sub-exploration finishes, the machine stands somewhere else. Undo
the arrival exactly — turn twice, step back, turn twice — so the parent
call finds the machine back on its own cell, facing the direction it
left off with.
