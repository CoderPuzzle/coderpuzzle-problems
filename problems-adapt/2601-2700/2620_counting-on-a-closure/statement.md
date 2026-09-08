# Counting On A Closure

## Description

Given an integer `n`, build a counter function. The first call to that
counter hands back `n`, and every call after that hands back one more
than the call before it — so the answers run `n`, `n + 1`, `n + 2`, and
so on.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`run(counterProbe)`, where `counterProbe` is a bundle-provided
`CounterProbe` carrying `.n`, the integer above, and `.calls`, one
`"call"` entry for every invocation to replay. Define `makeCounter(n)`
at top level with that shape, then hand your factory over by calling
`counterProbe.drive(makeCounter)` — the driver builds one counter from
your factory with `n`, invokes it once per `"call"` entry, and records
each return value; that recorded list is the judged answer.

### Example 1

```text
Input:
n = 8
calls = ["call","call","call","call"]
Output: [8,9,10,11]
Explanation: The first call reports the starting value 8, and each later
call reports one more than the one before it.
```

### Example 2

```text
Input:
n = -5
calls = ["call","call","call"]
Output: [-5,-4,-3]
Explanation: Counting climbs from a negative start just the same.
```

### Example 3

```text
Input:
n = 250
calls = []
Output: []
Explanation: With no entries to replay, the counter is never invoked and
the transcript stays empty.
```

### Constraints

- `-1000 <= n <= 1000`
- `0 <= calls.length <= 1000`
- `calls[i]` is `"call"`

## Hints

### Hint 1

A function in JavaScript can return another function that keeps using
the variables declared around it — that pairing of function and
surrounding state is a closure.

### Hint 2

Seed a private count in the outer function and let the inner function
advance it.
