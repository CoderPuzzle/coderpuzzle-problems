# Stripping Falsy Slots

## Description

Given an object or array `obj`, produce its falsy-stripped form: a copy of
the original structure with every slot holding a falsy value removed.

The operation reaches the whole tree — each surviving container gets the
same treatment recursively. Arrays count as objects whose keys are their
indices, so a dropped array element makes every later element shift one
slot left, while a dropped object key simply disappears. A value is falsy
exactly when `Boolean(value)` is `false`.

You may assume `obj` is the output of `JSON.parse` — in other words, valid
JSON. Within JSON the only falsy values are `false`, `null`, `0`, and the
empty string `""`; `undefined` and `NaN` cannot occur.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — there are no other languages for it. Your entry point is a class
`Solution` with `run(falsySweepCase)`; inside it, call
`falsySweepCase.check(this)`. The bundle-provided case runner then hands
your `stripFalsy(obj)` method a fresh copy of the parsed structure and
compares your returned value against the expected stripped structure right
inside the harness, walking keys and indices: slots whose values were
falsy must be gone entirely, containers — including ones left completely
empty — must remain in place, and key order never matters.

### Example 1

```text
Input: obj = {"key": 0, "next": {"inner": "", "list": [3, null, 4]}}
Output: {"next": {"list": [3, 4]}}
Explanation: The falsy slots — obj.key (0), obj.next.inner (""), and
obj.next.list[1] (null) — were removed; every container stayed.
```

### Example 2

```text
Input: obj = [1, "", [null, []], {"a": false}, 2]
Output: [1, [[]], {}, 2]
Explanation: The empty string was dropped, so the array shrank. Inside the
third element, null was removed but the empty array it left behind
survives; the fourth element loses its only key and remains as {}.
```

### Example 3

```text
Input: obj = {"z": [0], "y": {"n": null, "m": 8}}
Output: {"z": [], "y": {"m": 8}}
Explanation: Removing the only element of obj.z still leaves the array
itself in place, and obj.y.n vanishes while its sibling survives.
```

### Constraints

- obj is a valid JSON object or array
- 2 <= JSON.stringify(obj).length <= 10⁶
