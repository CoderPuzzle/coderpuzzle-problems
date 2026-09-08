# First Pattern Match in a Bit Stream

## Description

This is an **interactive** problem.

Bits arrive from a channel that cannot be rewound. Your method receives the
channel as a `BitStream` object exposing a single operation:

- `next()` — returns the next bit (`0` or `1`) of the stream, in arrival
  order. There is no way to look back at a bit already read.

It also receives a short array of bits, `pattern`. Return the smallest index
`i` such that the bits produced at positions `i, i+1, …, i+m−1` equal the
pattern exactly, where position 0 is the first bit `next()` ever returned.
The judge guarantees that a match begins somewhere within the bits it has
recorded.

**Note (CoderPuzzle):** the signature is `firstMatchIndex(stream, pattern)`; the
channel permits 1 000 000 `next` calls, and reading beyond the recorded
prefix fails — reaching that point at all means the search went wrong.

### Example 1

```text
Input: stream = [0,1,1,0,1,1,0,1], pattern = [1,1,0]
Output: 1
Explanation: The bits at positions 1,2,3 are 1,1,0 — the earliest place the pattern occurs.
```

### Example 2

```text
Input: stream = [1,1,1], pattern = [1]
Output: 0
Explanation: A one-bit pattern matches at the very first position.
```

### Example 3

```text
Input: stream = [0,1,0,1,0,1,1], pattern = [0,1,1]
Output: 4
Explanation: The pattern first appears starting at position 4, where the bits read 0,1,1.
```

### Constraints

- `1 <= pattern.length <= 100`
- `pattern` holds only the bits `0` and `1`.
- The stream holds only the bits `0` and `1`.
- A match begins within the first 10⁵ bits.

## Hints

### Hint 1

Old bits are gone forever, so the last `pattern.length` bits must travel
with you: a window that admits each new bit while discarding the oldest one.

### Hint 2

After `t` bits are read (counting from 1), a full window of `m` bits ending
at `t` begins at index `t − m`; checking it against the pattern after every
arrival considers each candidate start exactly once.

### Hint 3

Python can pack the window into one machine integer — shift left, OR in the
new bit, mask to `m` bits — making each step O(1) and the comparison a
single equality. Languages without big integers keep a small circular
buffer instead and compare at most `m` entries with an early exit on the
first mismatch; both stay far under the budget.
