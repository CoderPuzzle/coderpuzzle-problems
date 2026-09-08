# Search a Hidden Sorted Sequence

## Description

This is an **interactive** problem.

Somewhere the judge holds a strictly increasing sequence of distinct integers.
You never see it whole and you never learn its length — your only access is
the `SequenceReader` object handed to your method:

- `get(index)` — returns the element at `index`, or `2147483647` (2³¹ − 1) when
  `index` is past the end.

The value you are looking for arrives as `target`, alongside the reader. Return
an index `k` with `secret[k] == target`, or `-1` if the sequence does not
contain it.

Every real element sits far below `2147483647`, so the sentinel is
unambiguous: reading it always means "out of range", never a stored value.

**Note (CoderPuzzle):** this problem accepts Python 3 and Java submissions only.
Your method receives `(reader, target)`; the reader permits 10 000 queries,
far beyond what any logarithmic strategy spends.

### Example 1

```text
Input: secret = [-8,-3,0,4,9,15,22], target = 9
Output: 4
Explanation: 9 is present, at index 4.
```

### Example 2

```text
Input: secret = [-8,-3,0,4,9,15,22], target = 7
Output: -1
Explanation: 7 is absent — it would slot between the 4 and the 9.
```

### Example 3

```text
Input: secret = [5], target = 5
Output: 0
Explanation: The shortest possible sequence, hit at the only index.
```

### Constraints

- `1 <= secret.length <= 10⁴`
- `-10⁴ <= secret[i], target <= 10⁴`
- The sequence is strictly increasing.
- Every element and the target sit far below the 2147483647 sentinel.

## Hints

### Hint 1

A binary search is fenced by two ends, and you are given only the left one.
But the sentinel exceeds every real element, so "is `get(i)` still below
`target`?" is a property that flips exactly once, from true to false, as `i`
grows — even past the end. Hunt for that flip with doubling probes.

### Hint 2

Once some index `hi` satisfies `get(hi) >= target`, the target — if present —
is confined to `[0, hi]`: everything after `hi` is larger still. Note which
probe last came back below `target`; it is a valid left fence.

### Hint 3

Inside `[0, hi]`, run the ordinary search for the smallest index whose value is
at least `target`, then compare: equal means found, anything else — a larger
value or the sentinel — means absent. Doubling plus the search spends about
`2 · log n` calls.
