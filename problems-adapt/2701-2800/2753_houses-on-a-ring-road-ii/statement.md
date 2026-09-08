# Houses On A Ring Road II

## Description

This is an **interactive** problem.

A ring road circles a ring of houses whose doors start out open or
closed — with the guarantee that at least one door starts open. You hold
a `ring` object of class `Ring` that models the circle, plus a positive
integer `k` bounding how many houses it can contain, so the true count
`n` satisfies `n <= k`.

You begin standing in front of one of the doors. Count the houses.

This stretch of the road is meaner than it looks: you may only close
doors, never open them, and you may only walk clockwise.

The `Ring` class offers these operations:

- `void closeDoor()` — close the door of the house you face.
- `boolean isDoorOpen()` — report whether the door you face is open.
- `void moveRight()` — step to the next house clockwise; from house `n`
  this wraps back to house `1`.

Return `ans`, the number of houses on the ring.

**Note (CoderPuzzle):** the signature is `houseCount(ring, k)`; the ring
arrives as the `Ring` object handed to your method, your starting
position is fixed by the input, and every `closeDoor`, `isDoorOpen`,
and `moveRight` call spends one unit of an ample 4 000 000-operation
budget.

### Example 1

```text
Input: doors = [0,1,1,0,1], k = 9
Output: 5
Explanation: There are 5 houses. Reading from where you start and
moving right, the 2nd, 3rd, and 5th doors are open and the others are
closed. The count is below the bound k = 9.
```

### Example 2

```text
Input: doors = [1,1,1], k = 4
Output: 3
Explanation: Every door is open, so no door stands out against its
neighbors. The count is 3, below the bound k = 4.
```

### Constraints

- `n == number of houses`
- `1 <= n <= k <= 10⁵`
- `doors` is circular: the right neighbor of house `n` is house `1`.
- The input is generated such that at least one door is open.

## Hints

### Hint 1

Imagine first that exactly one door is open, and solve that case.

### Hint 2

Now close the open door you just found.

### Hint 3

Then visit `k` houses moving right. If you never see another open door,
your one-open-door assumption held, and you already know the answer.

### Hint 4

If some open door still remains, go back to step 1.
