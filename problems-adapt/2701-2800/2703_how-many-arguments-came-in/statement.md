# How Many Arguments Came In

## Description

Build a function `countArguments` whose whole job is to report how many
values arrived on a single call. It must accept any number of arguments of
any shape and return exactly that count.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — there are no other languages for it. Your submission declares
`class Solution` with the method `solve(callArgsCase)`, where `callArgsCase`
is a bundle-provided `CallArgsCase` carrying `.args`, the JSON array of
values this case will spread into your function. Define `countArguments`
so it tolerates any arity, then hand it the whole array in one spread —
`countArguments(...callArgsCase.args)` — and return whatever the call
reports: precisely the number of arguments that arrived.

### Example 1

```text
Input: args = [8, null, "eight", [8]]
Output: 4
Explanation: Four distinct values arrived — a number, null, a string, and
an array — so the call reports 4.
```

### Example 2

```text
Input: args = ["", [], {}]
Output: 3
Explanation: Empty payloads still take up real argument slots; the count
is 3 regardless of what each value holds inside.
```

### Example 3

```text
Input: args = [true, {"k": []}, "true", 0, [null]]
Output: 5
Explanation: Counting is positional, not semantic — five slots were
filled, including falsy ones like `0` and containers like `{"k": []}`, so
the answer is 5.
```

### Constraints

- args is a valid JSON array
- 0 <= args.length <= 100
