# An Object From Two Lists

## Description

Given two arrays, `keysArr` and `valuesArr`, assemble one object `obj`
from them: position `i` contributes the pair `keysArr[i] -> valuesArr[i]`.

Two rules shape the result:

- A key that has already appeared wins with its **first** value. When the
  key at position `i` was produced by some earlier position too, the later
  pair is dropped entirely.
- Every key goes through `String()` before it lands in the object, so a
  number key and a string key that render the same collide with each
  other, and `null` becomes the key `"null"`.

Return the finished object.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your entry point is a class `Solution` with `run(caseRunner)`;
inside it, call `caseRunner.check(this)`. The case runner then hands your
`buildObject(keysArr, valuesArr)` method the two arrays as live JavaScript
values: elements keep their real types, so the string `"1"` and the
number `1` arrive as genuinely different values that both coerce to the
key `"1"`. Judging compares your returned object against the expected
key-value structure inside the harness itself, over own string-keyed
properties: the key set must match exactly and every stored value must
compare deeply equal, while property insertion order is not observed.
Only keys go through String(); values are carried through untouched,
whatever their type.

### Example 1

```text
Input: keysArr = ["x", "y", "z"], valuesArr = [10, 20, 30]
Output: {"x": 10, "y": 20, "z": 30}
Explanation: The three keys are all fresh, so each keeps the value it was
paired with.
```

### Example 2

```text
Input: keysArr = [2, "2", null], valuesArr = ["a", "b", "c"]
Output: {"2": "a", "null": "c"}
Explanation: The number 2 and the string "2" coerce to the same key, so
only the first pair survives with the value "a". The null key renders as
the string "null".
```

### Example 3

```text
Input: keysArr = [false, "", 0], valuesArr = [1, 2, 3]
Output: {"false": 1, "": 2, "0": 3}
Explanation: Falsey values still make real keys once coerced — even the
empty string — so all three pairs land in the object.
```

### Constraints

- `keysArr` and `valuesArr` are valid JSON arrays
- `2 <= JSON.stringify(keysArr).length, JSON.stringify(valuesArr).length <= 5 * 10⁵`
- `keysArr.length === valuesArr.length`
