# Folding An Array From The Left

## Description

You are given an integer array `nums`, a two-argument combining function
`fn`, and a starting value `init`. Fold the array from the left: keep a
running value that begins at `init`, and for each element in order replace
it with `fn(running value, current element)`. The value left after the last
element is the answer.

Written out, the sequence is `val = fn(init, nums[0])`, then
`val = fn(val, nums[1])`, then `val = fn(val, nums[2])`, and so on — each
call's result is the next call's first argument — and the final `val` is
what you return.

An empty array never enters the fold, so the answer is just `init`.

Do not use the built-in `Array.reduce` method; write the loop yourself.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function foldLeft(nums, fn, init)` plus a
class `Solution` whose `reduce` method hands your function to the
bundle-provided case carrier: `foldLeftCase.nums`, `foldLeftCase.fn` and
`foldLeftCase.init` are the case's inputs (the function built from its
source text), so the method's job is to return
`foldLeft(foldLeftCase.nums, foldLeftCase.fn, foldLeftCase.init)`. That
returned number is the judged answer, compared exactly.

### Example 1

```text
Input:
nums = [2, 7, 11]
fn = function total(accum, curr) { return accum + 2 * curr; }
init = 5
Output: 45
Explanation:
the running value starts at 5.
(5) + 2 * nums[0] = 9
(9) + 2 * nums[1] = 23
(23) + 2 * nums[2] = 45
The final answer is 45.
```

### Example 2

```text
Input:
nums = [4, 1, 6, 3]
fn = (accum, curr) => accum - curr
init = 50
Output: 36
Explanation:
the running value starts at 50 and sheds one element at a time:
50 - 4 = 46, 46 - 1 = 45, 45 - 6 = 39, 39 - 3 = 36.
```

### Example 3

```text
Input:
nums = [9, 9, 9]
fn = (accum, curr) => Math.max(accum, curr)
init = 2
Output: 9
Explanation:
every fold step keeps the larger of the running value and the element, so
the first element already lifts the running value to 9 and it stays there.
```

### Constraints

- `0 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- `0 <= init <= 1000`

## Hints

### Hint 1

Hold the running value in one variable, seeded with `init`.

### Hint 2

Walk the array left to right, overwriting that variable with
`fn(value, nums[i])`, and return it when the walk ends.
