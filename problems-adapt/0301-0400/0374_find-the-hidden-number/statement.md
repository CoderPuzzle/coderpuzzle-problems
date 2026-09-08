# Find the Hidden Number

## Description

A fixed but unknown integer `pick` lies in the inclusive range `[1, n]`. Locate
it by querying a problem-provided `NumberJudge` object. Calling
`compareGuess(num)` returns:

- `-1` when `num` is greater than `pick`;
- `1` when `num` is less than `pick`;
- `0` when the two values are equal.

Return the hidden value.

**CoderPuzzle interface:** implement `locateHiddenNumber(numberJudge, n)` on the
`Solution` class. Use `numberJudge.compareGuess(num)` to make a query.

### Example 1

```text
Input: n = 20, pick = 13
Output: 13
```

### Example 2

```text
Input: n = 7, pick = 1
Output: 1
```

### Example 3

```text
Input: n = 100, pick = 100
Output: 100
```

### Constraints

- `1 <= pick <= n <= 2³¹ - 1`
