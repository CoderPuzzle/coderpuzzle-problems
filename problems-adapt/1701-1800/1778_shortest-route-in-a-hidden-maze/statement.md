# Shortest Route in a Hidden Maze

## Description

This is an **interactive** problem.

A walker stands somewhere inside a maze you cannot see. The maze is a grid
of `m x n` cells, each of them open or walled; one open cell holds the
walker, and a different open cell is the goal. Report how many steps the
shortest walk between the two takes — without ever being shown the map,
the starting point, or the goal.

Your only door into the maze is the `MazeController` object handed to your
method:

- `canMove(direction)` — `true` when the cell one step in that direction is open, `false` when it is walled or outside the grid.
- `move(direction)` — takes that step when it is open, and returns the cost of the cell entered, which is always `1` here. When the step would cross a wall or leave the grid, nothing happens and the return value is `-1`.
- `isTarget()` — `true` when the walker currently stands on the goal.

`direction` is one of `'U'`, `'D'`, `'L'`, `'R'`: one row up, one row down,
one column left, one column right.

Return the fewest moves that take the walker from its start to the goal, or
`-1` when nothing connects them.

**Note (CoderPuzzle):** judging works by answering queries against the hidden
maze — the grid, the start, and the goal are never revealed to your code.
The controller permits 4 000 000 queries, far beyond what a disciplined
exploration spends, but a program that wanders without direction will be
cut off.

### Example 1

```text
Input: grid = [[1, 1, 1], [0, 1, 0]], start = [1, 1], target = [0, 2]
Output: 2
Explanation: The walker starts in the middle of the bottom row, walled in
below. Stepping up reaches (0, 1) and stepping right reaches (0, 2), the
goal — two moves. (The judge answers only canMove/move/isTarget queries;
your code never sees the grid, the start, or the goal.)
```

### Example 2

```text
Input: grid = [[1, 0, 1], [1, 1, 1], [0, 0, 1]], start = [0, 0], target = [0, 2]
Output: 4
Explanation: The direct route along the top row is walled at (0, 1), so the
shortest walk detours through the middle row: (0, 0) -> (1, 0) -> (1, 1)
-> (1, 2) -> (0, 2), four moves.
```

### Example 3

```text
Input: grid = [[1, 0, 1], [1, 0, 1]], start = [0, 0], target = [0, 2]
Output: -1
Explanation: The middle column is walled in both rows, so the goal's
component never connects to the start's.
```

### Constraints

- `1 <= m, n <= 500`
- `grid[i][j] == 1` marks an open cell, `grid[i][j] == 0` a walled one.
- The start and the goal are different open cells.
- At most `4 000 000` oracle queries.

## Hints

### Hint 1

You never need the maze's true coordinates. Pick the start as your origin
and record every cell you reach by the displacement that brought you
there — a map built from relative positions describes connectivity just as
well as the real one.

### Hint 2

A depth-first walk that always reports home can survey the whole reachable
component: probe the four directions, take every open one that leads to a
cell you have not recorded, and after finishing with a cell, step back the
way you came. Ask `isTarget()` exactly once per newly entered cell, and
remember where it rang true.

### Hint 3

Once the survey ends you hold the full set of reachable cells, and every
step between neighbours costs the same, so plain breadth-first search from
the origin is the shortest-route computation — the first arrival at the
remembered goal cell carries the final distance. A survey that never heard
`isTarget()` ring means the goal is unreachable: answer `-1`.
