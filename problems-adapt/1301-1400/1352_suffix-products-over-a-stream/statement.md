# Suffix Products Over a Stream

## Description

Design a structure that receives integers one at a time and can report, at
any moment, the product of the `k` most recently received ones.

Implement the `SuffixProducts` class:

- `SuffixProducts()` creates the object, with nothing received yet.
- `void append(int num)` records `num` as the newest number.
- `int suffixProduct(int k)` multiplies together the `k` latest numbers.
  Whenever it is called, at least `k` numbers have been recorded.

Every product a call could request fits in a signed 32-bit integer.

**Note (CoderPuzzle):** submissions here are limited to Python 3 and Java.

### Example 1

```text
Input:
["SuffixProducts", "append", "append", "append", "append", "append", "suffixProduct", "suffixProduct", "append", "suffixProduct"]
[[], [2], [5], [0], [3], [4], [2], [4], [6], [3]]
Output:
[null, null, null, null, null, null, 12, 0, null, 72]
Explanation:
append(2);        // stream is [2]
append(5);        // stream is [2, 5]
append(0);        // stream is [2, 5, 0]
append(3);        // stream is [2, 5, 0, 3]
append(4);        // stream is [2, 5, 0, 3, 4]
suffixProduct(2); // 3 * 4 = 12
suffixProduct(4); // the window spans the 0, so 0
append(6);        // stream is [2, 5, 0, 3, 4, 6]
suffixProduct(3); // 3 * 4 * 6 = 72
```

### Example 2

```text
Input:
["SuffixProducts", "append", "suffixProduct", "append", "suffixProduct", "append", "suffixProduct", "suffixProduct"]
[[], [9], [1], [0], [1], [8], [1], [2]]
Output:
[null, null, 9, null, 0, null, 8, 0]
Explanation:
append(9);        // stream is [9]
suffixProduct(1); // 9
append(0);        // stream is [9, 0]
suffixProduct(1); // 0
append(8);        // stream is [9, 0, 8]
suffixProduct(1); // 8
suffixProduct(2); // the last two numbers are 0 and 8, so 0
```

### Constraints

- `0 <= num <= 100`
- `1 <= k <= 4 * 10⁴`
- At most `4 * 10⁴` calls will be made to `append` and `suffixProduct`.
- Every product the calls can request fits in a signed 32-bit integer.

### Follow-up

Both operations can run in `O(1)` time per call rather than `O(k)` — how?

## Hints

### Hint 1

A lone running total is not enough, since a query asks about a suffix, not
the whole stream. Keep the product of every prefix of the stream since some
starting point, and a suffix product becomes a single division.

### Hint 2

One `0` turns every product that reaches across it into `0`, and nothing
arriving later can undo that. When a `0` lands, which of the products you
are keeping are still worth anything?

### Hint 3

Restart the prefix table at the neutral element `1` after every `0`. A query
whose `k` reaches back past the start of the current table must span the
`0`, so it answers `0` without a single multiplication.
