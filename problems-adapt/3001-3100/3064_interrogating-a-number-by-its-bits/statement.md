# Interrogating a Number by Its Bits

## Description

This is an **interactive** problem.

A number `n` is being kept from you, and the only way in is a
question-answering object — the class `MaskedNumber`, handed to your
method — that responds to exactly one kind of question:

- `commonSetBits(num)` — reports how many bit positions hold a `1` in
  both `n` and `num` at once: the number of set bits in `n & num`.

Use those replies to reconstruct the hidden value, and return `n`.

**Note (CoderPuzzle):** the signature is `findNumber(maskedNumber)`; the API
arrives as the `MaskedNumber` object handed to your method — call
`maskedNumber.commonSetBits(num)` to query it.

### Example 1

```text
Input: n = 1
Output: 1
Explanation: Only bit 0 of n is set. The question about mask 1 reports a
single shared set bit, while the questions about 2, 4, 8, … all report
zero — thirty one-bit questions in all pin the number down.
```

### Example 2

```text
Input: n = 987654321
Output: 987654321
Explanation: Seventeen of the thirty single-bit masks each report one
shared set bit and the remaining thirteen report zero; the positions that
answered yes spell out 987654321 exactly.
```

### Example 3

```text
Input: n = 1073741823
Output: 1073741823
Explanation: All thirty low bits are set, so every one-bit question
answers 1 and the assembled value is 2³⁰ − 1.
```

### Constraints

- `1 <= n <= 2³⁰ - 1`
- `0 <= num <= 2³⁰ - 1`
- A question about a `num` outside that range has no defined answer.

## Hints

### Hint 1

A mask carrying a single set bit can share at most that one position with
`n`, so every reply to a one-bit mask is just 0 or 1.

### Hint 2

Ask about `2ⁱ` for each `i` from `0` through `29`: a positive reply marks
bit `i` of `n` as set, and thirty answers leave nothing unknown.
