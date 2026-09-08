# Hello On Demand

## Description

Build a factory `makeGreeter` that hands back one new function, and that
returned function answers `"Hello World"` every single time it is
invoked — no matter how many arguments arrive or what they carry.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function makeGreeter()` at top level with
the behavior above; the generated `class Solution` keeps its
`run(greetingRehearsal)` method, whose body hands your factory to the
bundle-provided driver via `greetingRehearsal.drive(makeGreeter)`. The
driver builds one greeter from your factory, then replays the case's
`calls` rows through it — each row holds one call's arguments (never
more than ten) and every value that comes back is recorded. The recorded
list, one entry per row, is the judged answer shown as Output below.

### Example 1

```text
Input:
calls = [[],["salutations",9,null,false]]
Output: ["Hello World","Hello World"]
Explanation:
const greet = makeGreeter();
greet(); // "Hello World"
greet("salutations", 9, null, false); // "Hello World"

Empty argument lists and populated ones land on the identical string.
```

### Example 2

```text
Input:
calls = [[12.5,[1,2]]]
Output: ["Hello World"]
Explanation:
const greet = makeGreeter();
greet(12.5, [1, 2]); // "Hello World"

Even structured arguments — a number beside a nested array — change
nothing about the answer.
```

### Constraints

- `0 <= args.length <= 10`
