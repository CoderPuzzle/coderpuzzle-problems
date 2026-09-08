# Houses On A Ring Road

## Description

This is an **interactive** problem.

A ring road carries a circle of houses, and you arrive holding a `ring`
object of class `Ring` that models it, together with a positive integer
`k` — an upper bound on how many houses the circle can contain (so the
true count `n` satisfies `n <= k`). Every house has a door, and each
door may start out open or closed.

You begin standing in front of one of those doors. Count the houses.

The `Ring` class offers these operations:

- `void openDoor()` — open the door of the house you face.
- `void closeDoor()` — close the door of the house you face.
- `boolean isDoorOpen()` — report whether the door you face is open.
- `void moveRight()` — step to the next house clockwise.
- `void moveLeft()` — step to the next house counterclockwise.

Return `ans`, the number of houses on the ring.

**Note (CoderPuzzle):** the signature is `houseCount(ring, k)`; the ring
arrives as the `Ring` object handed to your method, your starting
position is fixed by the input, and every `openDoor`, `closeDoor`,
`isDoorOpen`, `moveRight`, and `moveLeft` call spends one unit of an
ample 1 000 000-operation budget.

### Example 1

```text
Input: ring = [1,1,0,1,0,0], k = 9
Output: 6
Explanation: There are 6 houses. Reading from where you start and
moving right, the 1st, 2nd, and 4th doors are open and the rest are
closed. The count is below the bound k = 9.
```

### Example 2

```text
Input: ring = [0,1], k = 3
Output: 2
Explanation: There are 2 houses: the door you start in front of is
closed, and the next house's door is open. The count stays below the
bound k = 3.
```

### Constraints

- `n == number of houses`
- `1 <= n <= k <= 10³`

## Hints

### Hint 1

Walk through `k` consecutive houses in one direction, closing every
door you pass.

### Hint 2

Open the door of the house you are standing at.

### Hint 3

Keep moving in that same direction and count houses until you find the
door you opened again.
