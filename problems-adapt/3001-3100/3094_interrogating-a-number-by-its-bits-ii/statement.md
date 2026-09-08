# Interrogating a Number by Its Bits II

## Description

This is an **interactive** problem.

Where its prequel let you question a number that sat still, this one hides
a value that shifts under questioning. Your method receives an object of
the class `RestlessNumber` holding the current value, and each call to its
single question does three things, in order:

- `commonBits(num)` — counts how many of the low 30 bit positions of the
  **current** value agree with `num`; then flips, inside the object, every
  bit the value shares with `num` (a XOR with `num`); then reports the
  count taken before that flip.

The replies therefore never describe the original number twice in a row —
yet what you must return is the initial `n`. Make every disturbance pay,
undo each one, and read the value back out.

**Note (CoderPuzzle):** the signature is `findNumber(restlessNumber)`; the API
arrives as the `RestlessNumber` object handed to your method — call
`restlessNumber.commonBits(num)` to query it.

### Example 1

```text
Input: n = 0
Output: 0
Explanation: The probe of 0 answers 30 — every low bit agrees with zero.
Each single-bit mask then answers 29 on its first ask (below base: only
the probed position disagrees) and 30 when asked a second time, which
also undoes that flip. Thirty clear bits assemble to 0.
```

### Example 2

```text
Input: n = 999999999
Output: 999999999
Explanation: The probe of 0 reports 9, the value's count of zero bits.
Twenty-one of the single-bit masks answer 10 — one above base — on their
first ask, marking exactly the set positions; each must be re-asked to
restore the number before the next probe.
```

### Example 3

```text
Input: n = 1073741823
Output: 1073741823
Explanation: Base comes out 0, and every single-bit mask answers 1 on its
first ask (only that position agrees) and 0 on the re-ask — all thirty
bits are set.
```

### Constraints

- `0 <= n <= 2³⁰ - 1`
- `0 <= num <= 2³⁰ - 1`
- A question about a `num` outside that range has no defined answer.

## Hints

### Hint 1

Ask about 0 first. XOR with 0 changes nothing, and the reply — call it
base — counts the zero positions among the low 30 bits.

### Hint 2

While the value is undisturbed, a one-bit mask `2ⁱ` answers `base + 1`
when bit `i` is set (that position agrees as well) and `base − 1` when it
is clear.

### Hint 3

The probe itself flips bit `i`, so ask the very same mask once more:
XOR-ing with the same number undoes the XOR, and the next probe sees the
original value again.
