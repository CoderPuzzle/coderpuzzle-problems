# Search a Hidden Mountain Sequence

## Description

This is an **interactive** problem.

The judge holds a **mountain sequence**: at least three values long,
strictly increasing up to some interior index and strictly decreasing
after it — rise, one summit, fall. You cannot read the sequence
directly. Your only access is the `MountainReader` object handed to your
method:

- `get(index)` — the value stored at `index`, 0-indexed.
- `length()` — how many values the sequence holds.

The value you want arrives as `target`, alongside the reader. Return the
**smallest index** at which the sequence stores `target`, or `-1` when
`target` never occurs.

More than **100 calls to `get`** are judged wrong (the reader's budget);
`length()` is free, so a linear scan is simply too expensive to survive.

**Note (CoderPuzzle):** your method receives `(reader, target)` and must draw
everything else from the two reader operations — the sequence's shape
included.

### Example 1

```text
Input: mountain = [2,4,7,6,3], target = 7
Output: 2
Explanation: 7 is the summit, at index 2 — the smallest (and only) index
holding it.
```

### Example 2

```text
Input: mountain = [3,6,8,5,1], target = 5
Output: 3
Explanation: 5 appears once, on the falling slope at index 3 — the
rising slope holds 3, 6, and 8, so no earlier index stores 5.
```

### Example 3

```text
Input: mountain = [1,5,2], target = 3
Output: -1
Explanation: 3 is absent — it would fit between the 1 and the 5 on the
way up, but no position holds it.
```

### Constraints

- `3 <= mountain.length() <= 10⁴`
- `0 <= target <= 10⁹`
- `0 <= mountain.get(index) <= 10⁹`
- The sequence rises strictly to an interior summit, then falls
  strictly.
- At most 100 calls to `get`.

## Hints

### Hint 1

Reading `get(mid)` and `get(mid + 1)` side by side tells you which side
of the summit `mid` is on: still climbing, or already descending. That
predicate flips exactly once, so a bisection on it lands on the summit
for the price of about `2 · log n` reads.

### Hint 2

Left of the summit the sequence is an ordinary ascending run; right of
it, a descending one. Each half is searchable by the classic bisection
for `target`, mirrored appropriately.

### Hint 3

Search the ascending half first and answer immediately on a hit — any
index found there precedes every index of the descending half, which is
precisely the smallest-index requirement. Only on a miss does the
mirrored search of the descending half run. Three bisections total about
`4 · log n` reads, far inside the 100-read budget.
