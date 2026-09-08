# Counting Runs of Equal Numbers

## Description

This is an **interactive** problem.

A hidden array `nums` of integers is far too large to hand over
directly — it can stretch to 10¹⁵ entries — so the only way to read it
is through a probe interface, the class `VastArray`:

- `at(index)` — returns `nums[index]`, for a 64-bit `index`.
- `size()` — returns `nums.length`, as a 64-bit length.

One structural fact about `nums` is guaranteed up front: every value
occupies one contiguous stretch. Whenever `nums[i] == nums[j]` for some
`i < j`, every position strictly between them holds that same value.

Partition `nums` into its maximal blocks of equal values — its runs —
and return how many blocks there are.

**Note (CoderPuzzle):** your `countBlocks` method receives the `VastArray` as
its only argument. A test case describes `nums` by its maximal blocks —
each block as a `[value, count]` pair — and the judge builds the
`VastArray` from that description, so arrays far too large to list
directly are fair game. `at` takes a 64-bit index and `size` returns a
64-bit length.

### Example 1

```text
Input: nums = [5,5,5,5,2,7,7,7]
Output: 3
Explanation: The three blocks are [5,5,5,5], [2], and [7,7,7], so the
answer is 3.
```

### Example 2

```text
Input: nums = [4,4,6,6,6,4,4,6]
Output: 4
Explanation: A value may own more than one block as long as another
value separates the stretches: here 4 owns [4,4] and [4,4], while 6 owns
[6,6,6] and [6] — four blocks in all.
```

### Example 3

```text
Input: nums = [42,42,42,42,42,42,42,42,42,42]
Output: 1
Explanation: Every entry holds 42, so the whole array is a single block
and the answer is 1.
```

### Constraints

- `1 <= nums.length <= 10¹⁵`
- `1 <= nums[i] <= 10⁹`
- The input is generated such that all equal values are adjacent.
- The sum of the elements of `nums` is at most 10¹⁵.

## Hints

### Hint 1

Begin at index 0. The block that contains it ends at the last position
that still holds `at(0)`.

### Hint 2

Since equal values sit side by side, "`at(m)` still equals the block's
value" is true on one contiguous stretch and false ever after — a
monotone condition. Gallop outward to bracket where it stops being true,
then bisect inside the bracket.

### Hint 3

Step one position past each finished block and repeat until the position
reaches `size()`; the number of rounds is the answer.
