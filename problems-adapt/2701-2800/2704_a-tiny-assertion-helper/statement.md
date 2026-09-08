# A Tiny Assertion Helper

## Description

Write a function `checkThat` — the kind of helper a testing library is
built on. It takes any value `val` and returns an object carrying two
matcher methods.

- `sameAs(other)` returns `true` when `val` and `other` are `===` to each
  other. When they are not, it throws an error `"Not Equal"`.
- `notSameAs(other)` returns `true` when `val` and `other` are `!==` to
  each other. When they are equal, it throws an error `"Equal"`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — there are no other languages for it. Your submission declares the
function `checkThat(val)` plus a class `Solution` whose `run(assertionCase)`
hands that function to the bundle-provided case carrier:
`assertionCase.drive(checkThat)`. Each case's `func` is a thunk source such
as `() => checkThat(5).sameAs(5)`; the driver compiles it with your
`checkThat` in scope, runs it, and records the outcome — `{"value": true}`
when the thunk returns normally, `{"error": "<message>"}` when it throws.
That recorded object is the judged answer, compared exactly.

### Example 1

```text
Input: func = () => checkThat("lead").sameAs("lead")
Output: {"value": true}
Explanation: "lead" === "lead", so the matcher returns true.
```

### Example 2

```text
Input: func = () => checkThat(0).sameAs(false)
Output: {"error": "Not Equal"}
Explanation: Strict equality never coerces — the number 0 and the boolean
false are different values, so the matcher throws "Not Equal".
```

### Example 3

```text
Input: func = () => checkThat(7).notSameAs(9)
Output: {"value": true}
Explanation: 7 !== 9, so the complement matcher returns true.
```

### Constraints

- `val` and the value passed to `sameAs` or `notSameAs` may be of any
  type — numbers, strings, booleans, null, undefined, objects, or arrays.
- The comparison is JavaScript's strict equality: no type coercion, and
  two distinct objects are never equal even when their contents match.
