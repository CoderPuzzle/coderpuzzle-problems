# Dealing The Array Into Hands

## Description

Given an array `arr` and a hand size `size`, deal the array's elements
into an array of hands.

The result carries every element of `arr` in its original order, dealt
into subarrays of exactly `size` elements apiece. Only the final hand may
come up short, when `arr.length` is not an exact multiple of `size`.

Please solve it without reaching for lodash's `_.chunk`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function deal(arr, size)` with the
behavior above; the generated `class Solution` keeps its `run(dealProbe)`
method, whose body hands your function to the bundle-provided driver:
`dealProbe.drive(deal)`. The driver calls your function once with the
case's `.arr` and `.size`; whatever array of hands comes back is recorded
by the driver as the judged output shown as Output below.

### Example 1

```text
Input: arr = [4,8,15,16,23,42], size = 2
Output: [[4,8],[15,16],[23,42]]
Explanation: Six elements at two per hand deal into three full hands.
```

### Example 2

```text
Input: arr = [7,1,9,2,5], size = 2
Output: [[7,1],[9,2],[5]]
Explanation: Five elements at two per hand fill two hands completely, and
the leftover element forms a short final hand.
```

### Example 3

```text
Input: arr = [3,6], size = 3
Output: [[3,6]]
Explanation: The hand size exceeds the array length, so everything fits
in the single first hand.
```

### Example 4

```text
Input: arr = [], size = 1
Output: []
Explanation: Nothing to deal means no hands at all.
```

### Constraints

- `arr` is a valid JSON array
- `2 <= JSON.stringify(arr).length <= 10^5`
- `1 <= size <= arr.length + 1`
