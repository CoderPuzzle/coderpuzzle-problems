# Tally Counter II

## Description

Author a factory function `createTally` that accepts one integer `init`,
the starting value, and gives back an object offering exactly three
operations:

- `increment()` bumps the current value up by 1 and reports it.
- `decrement()` nudges the current value down by 1 and reports it.
- `reset()` restores the current value to `init` and reports it.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — no other languages are offered for it. Your submission declares
`class Solution` with the method `run(tallyCase)`, where `tallyCase` is
a bundle-provided `TallyCase` carrying `.init`, the integer above, and
`.calls`, one `"increment"` / `"decrement"` / `"reset"` entry per
invocation to replay. Define `createTally(init)` at top level exactly as
the signature above suggests, then hand it over by calling
`tallyCase.drive(createTally)` — the driver builds your object with
`init`, invokes the requested method once per entry, and records every
return value; that recorded list is the judged answer.

### Example 1

```text
Input:
init = -7
calls = ["increment","decrement","reset","decrement"]
Output: [-6,-7,-7,-8]
Explanation:
const tally = createTally(-7);
tally.increment(); // -6
tally.decrement(); // -7
tally.reset(); // -7
tally.decrement(); // -8
```

### Example 2

```text
Input:
init = 12
calls = ["increment","increment","increment"]
Output: [13,14,15]
Explanation: Three bumps in a row walk the value 12, 13, 14, 15 with no
reset in sight.
```

### Example 3

```text
Input:
init = 500
calls = ["reset","decrement"]
Output: [500,499]
Explanation: The reset reproduces the starting value 500 even though
nothing had changed yet, and the following decrement reports 499.
```

### Constraints

- `-1000 <= init <= 1000`
- `0 <= calls.length <= 1000`
- `calls[i]` is one of `"increment"`, `"decrement"` and `"reset"`

## Hints

### Hint 1

An object literal whose properties are functions is all the shape you
need to return.

### Hint 2

Hold the running value in one captured variable and the original `init`
in another; each method updates the running value as asked and gives the
new value back.
