# Cheapest Route in a Hidden Maze

## Description

This is an **interactive** problem.

A walker stands somewhere inside a maze you cannot see. The maze is a grid
of `m x n` cells; most cells are open and charge a toll, the rest are
walled. One open cell holds the walker, and a different open cell is the
goal. Every move onto an open cell costs that cell's toll — and the toll
is charged again on every later visit, so a cheap route may be worth
walking even when it is long. The walker's starting cell charges nothing
for simply standing there.

Work out the smallest total toll that carries the walker from its start
to the goal — without ever being shown the map, the starting point, or
the goal. Your only door into the maze is the `MazeController` object
handed to your method:

- `canMove(direction)` — `true` when the cell one step in that direction is open, `false` when it is walled or outside the grid.
- `move(direction)` — takes that step when it is open and returns the toll of the cell entered. When the step would cross a wall or leave the grid, nothing happens and the return value is `-1`.
- `isTarget()` — `true` when the walker currently stands on the goal.

`direction` is one of `'U'`, `'D'`, `'L'`, `'R'`: one row up, one row down,
one column left, one column right.

Return the smallest total toll for a walk from the start to the goal, or
`-1` when nothing connects them.

**Note (CoderPuzzle):** judging works by answering queries against the hidden
maze — the grid, the start, and the goal are never revealed to your code.
The controller permits 1 000 000 queries, far beyond what a disciplined
exploration spends, but a program that wanders without direction will be
cut off.

### Example 1

```text
Input: grid = [[1, 4], [3, 2]], start = [0, 0], target = [1, 1]
Output: 5
Explanation: Crossing right first collects 4, then the step down collects
2 — a total of 6. Going down first collects 3, then the step right
collects 2, for 5. (The judge answers only canMove/move/isTarget queries;
your code never sees the grid, the start, or the goal.)
```

### Example 2

```text
Input: grid = [[5, 8, 8], [2, 9, 9], [1, 1, 1]], start = [2, 0], target = [0, 2]
Output: 19
Explanation: Climbing the left column and crossing the top row costs
2 + 5 + 8 + 8 = 23. Walking the cheap bottom row first and climbing at
the right edge costs 1 + 1 + 9 + 8 = 19, which is best.
```

### Example 3

```text
Input: grid = [[4, 0, 7], [2, 0, 6]], start = [0, 0], target = [0, 2]
Output: -1
Explanation: The middle column is walled in both rows, so the goal's
component never connects to the start's.
```

### Constraints

- `1 <= m, n <= 100`
- `grid[i][j] == 0` marks a walled cell; any other value marks an open cell whose toll is that value.
- `1 <= grid[i][j] <= 100` for open cells.
- The start and the goal are different open cells.
- At most `1 000 000` oracle queries.

## Hints

### Hint 1

Each `move` answer is a piece of the map you get for free: it names the
toll of the cell just entered. Pair it with `canMove` to detect walls
without losing your place, and record everything against coordinates
relative to the start — the maze's absolute position never matters.

### Hint 2

A depth-first walk that always reports home can survey the whole reachable
component: step into every open, unrecorded neighbour and, after finishing
with a cell, step back the way you came. Ask `isTarget()` exactly once per
newly entered cell, and remember where it rang true.

### Hint 3

Tolls differ per cell, so layer-by-layer search is no longer exact —
with the surveyed tolls in hand, run Dijkstra from the origin: repeatedly
settle the cheapest frontier cell and relax its neighbours with
`toll(neighbor)` added. The settled cost of the remembered goal cell is
the answer; if the survey never heard `isTarget()` ring, answer `-1`.
