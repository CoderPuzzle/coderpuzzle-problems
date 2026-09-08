# First Pattern Match in a Bit Stream II

## Description

This is an **interactive** problem.

Bits keep arriving from a channel you can only move forward through, and
your method talks to that channel through a `BitStream` object exposing a
single operation:

- `next()` — consumes and returns the next bit (`0` or `1`) of the feed.
  Bits already read are gone; there is no rewinding.

Alongside the feed your method receives a binary array `pattern`. Return
the earliest index `i` such that the bits delivered at positions
`i, i+1, …, i+m−1` reproduce the pattern exactly, counting the very first
bit `next()` ever produced as position 0.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
signature is `findPattern(stream, pattern)`; the feed allows 1 000 000
`next` calls, and reading past the recorded prefix raises an error — a
correct solution finds its match long before ever getting there.

### Example 1

```text
Input: stream = [1,1,0,1,0,0,1,1], pattern = [1,0,0]
Output: 3
Explanation: Reading forward, the run starting at position 3 is the first
whose bits are 1,0,0 — the two earlier 1s both fail to extend into the
pattern.
```

### Example 2

```text
Input: stream = [0,0,0,1], pattern = [0,0,0,1]
Output: 0
Explanation: The whole recorded feed is itself one occurrence of the
pattern, so the match begins at the very first position.
```

### Example 3

```text
Input: stream = [1,1,1,0,0,1,1,0,1,1,0], pattern = [1,1,0,1,1]
Output: 5
Explanation: A near miss at position 1 (1,1,0 followed by 0 instead of 1)
shows why remembering how much of the pattern still stands matters; the
genuine match starts at position 5.
```

### Constraints

- `1 <= pattern.length <= 10⁴`
- `pattern` holds only the bits `0` and `1`.
- The feed holds only the bits `0` and `1`.
- A match begins somewhere within the first 10⁵ recorded bits.

## Hints

### Hint 1

The pattern can be four orders of magnitude longer here than in a small
window problem, so re-comparing the whole pattern at every candidate start
is far too slow — the feed can be nearly uniform, and near misses must not
force a full restart.

### Hint 2

Precompute the pattern's failure function: for each prefix length, the
longest proper prefix of the pattern that is also a suffix of that prefix.

### Hint 3

Feed bits through the automaton one at a time, keeping the length of the
longest pattern prefix that ends at the bit just read; on a mismatch, fall
back along the failure links instead of re-reading anything. When that
length reaches the pattern's own length, the start index is the count of
bits read so far minus the pattern length.
