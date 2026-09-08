# Rightmost Match In A Sorted Array

## Description

Enhance every array so that calling `rightmostMatch(target)` on it
reports where `target` last sits. The array is sorted in ascending order
and may repeat values; when `target` does not appear at all, the call
reports `-1`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — there are no other languages for it. Your submission declares
`class Solution` with the method `solve(sortedCase)`, where `sortedCase`
is a bundle-provided `SortedCase` carrying `.nums`, the sorted array
under test, and `.target`, the value whose last occurrence must be
reported. Enhance `Array.prototype` with `rightmostMatch`, then return
the result of calling `sortedCase.nums.rightmostMatch(sortedCase.target)`
— the last index of `target`, or `-1` when it is absent.

### Example 1

```text
Input: nums = [2,5,5,9], target = 5
Output: 2
Explanation: The value 5 occupies indexes 1 and 2; the later of the two
is reported.
```

### Example 2

```text
Input: nums = [1,3,8], target = 4
Output: -1
Explanation: No element equals 4 — the run of 5s in Example 1 is easy to
find, but a value that falls between stored elements has no slot, so the
answer is -1.
```

### Example 3

```text
Input: nums = [-4,-4,-1,0,0,7], target = 0
Output: 4
Explanation: 0 appears at indexes 3 and 4; the rightmost occurrence is 4.
```

### Constraints

- 1 <= nums.length <= 10⁴
- -10⁴ <= nums[i], target <= 10⁴
- nums is sorted in ascending order.

### Follow up

Can you solve it in O(log n) time?

## Hints

### Hint 1

Inside a function assigned to `Array.prototype.rightmostMatch`, the
keyword `this` is the array the call was made on: `this[i]` reads one
element and `this.length` knows how long the array is.

### Hint 2

The sorted order is the whole trick — a binary search finds the answer
without ever scanning the array.

### Hint 3

Probe the middle element. When it is less than or equal to the target,
every slot at or left of it can be ruled out at once.
