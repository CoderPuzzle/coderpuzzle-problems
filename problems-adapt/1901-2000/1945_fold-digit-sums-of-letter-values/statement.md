# Fold Digit Sums of Letter Values

## Description

Start with a string `s` of lowercase English letters and an integer `k`.
First rewrite the string as one long number: each letter becomes its
position in the alphabet (`'a'` is 1 through `'z'` is 26), and all the
positions are concatenated in order. Then fold that number `k` times,
where one fold replaces the current number with the sum of its decimal
digits.

Return the number left after all `k` folds.

### Example 1

```text
Input: s = "cyber", k = 1
Output: 26
Explanation: "cyber" becomes "(3)(25)(2)(5)(18)" → "3252518", and its
digit sum is 3 + 2 + 5 + 2 + 5 + 1 + 8 = 26.
```

### Example 2

```text
Input: s = "coderpuzzle", k = 2
Output: 3
Explanation: "coderpuzzle" becomes "(15)(16)(5)(14)(15)(10)" → "15165141510",
whose digit sum is 30; folding once more turns 30 into 3 + 0 = 3.
```

### Example 3

```text
Input: s = "abc", k = 1
Output: 6
Explanation: "abc" becomes "123", and 1 + 2 + 3 = 6.
```

### Constraints

- `1 <= s.length <= 100`
- `1 <= k <= 10`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Build the concatenated digit string first; with up to 100 letters it can
hold around 200 digits, so keep it as a string rather than an integer.

### Hint 2

The first fold lands at most at `200 × 9`, and every later fold shrinks
the value further, so the remaining `k - 1` folds are cheap to simulate
directly.
