# Voting Inside A Sealed Array

## Description

A sealed array holds votes: most entries share one value (the majority
value), and every other entry has some other value. You cannot look at
the array — you can only ask a counting interface questions. Name the
index of any entry that holds the majority value, or `-1` if no majority
exists.

The interface is the `SealedBag`:

- `int length()` — returns the array's length.
- `int query(int left, int right, int target)` — considering the
  sub-array from index `left` to `right` inclusive, returns how many
  entries at those positions hold the value `target`.

Implement `callMajority(sealedBag)` — a value is a majority when it
appears strictly more than `length / 2` times; if one exists, return the
index of any entry holding it.

**Note (CoderPuzzle):** the judge hands your method a `SealedBag` wired to the
hidden array and accepts any index whose entry holds the majority value
(checked against an accepted set); when no majority exists it expects
`-1`.

### Example 1

```text
Input: nums = [1,1,0,0,0]
Output: 2
Explanation: The value 1 appears twice, the value 0 three times — the
majority is 0, held at indices 2, 3, and 4; any of the three is an
accepted answer.
```

### Example 2

```text
Input: nums = [0,1,0,1,0]
Output: 0
Explanation: The value 0 appears three times out of five and holds
indices 0, 2, and 4.
```

### Example 3

```text
Input: nums = [1,0,1,0,1,0,1,0]
Output: -1
Explanation: The two values split the eight entries evenly — no majority
exists.
```

### Constraints

- `5 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 1`
- Calling `query` more than `2 * nums.length` times is judged wrong.
