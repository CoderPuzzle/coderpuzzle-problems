# Which Half Is Heavier

## Description

A sealed array of integers is handed to you behind an interface you can
query but never read directly. Exactly one entry is a heavier value than
all the others (which are all equal); the odd one out sits either in the
first half of the array or the second. Report its index.

The interface is the `BalanceReader`:

- `int compareSub(int l, int r)` — considering the contiguous sub-array
  from index `l` to `r` inclusive, returns `1` if that sub-array's sum is
  greater than the mirror sub-array of the same length at the opposite
  end, `-1` if it is smaller, and `0` if the two sums are equal.
- `int length()` — returns the array's length.

Implement `heavierHalf(reader)` — compare half against half with as few
`compareSub` calls as you can, and return the index of the heavier
value.

**Note (CoderPuzzle):** the judge hands your method a `BalanceReader` wired to
the hidden array and checks the returned index.

### Example 1

```text
Input: arr = [4,4,4,9,4]
Output: 3
Explanation: The heavier entry 9 sits at index 3, in the second half.
```

### Example 2

```text
Input: arr = [1,5,1,1]
Output: 1
```

### Constraints

- `3 <= arr.length <= 10⁵`
- Exactly one entry differs from all the others, and it is larger.
