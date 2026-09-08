# Swapping Undefined For Null

## Description

`undefined` and `null` are different values in JavaScript, and
serialization treats them differently too: JSON.stringify drops object
keys that hold `undefined` and turns array slots holding it into `null`.
Given a deeply nested object or array `obj`, hand back the same
structure with every `undefined` value replaced by an explicit `null`,
so the serialized form stays exactly the shape the data describes.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your entry point is a class `Solution` with
`run(nullSwapCase)`; inside it, call `nullSwapCase.check(this)`. The
case runner then hands your `nullifyUndefined(obj)` method a freshly
built live object: real objects and arrays in which selected slots hold
genuine `undefined` values — own properties throughout, arrays always
dense (an `undefined` element occupies its index; nothing is sparse).
Return obj with every such undefined replaced by null; transforming a
deep copy or rebuilding the structure fresh are both fine. Judging
compares your returned value against the expected structure inside the
harness itself, walking keys and indices: a slot that is merely absent,
a slot still holding `undefined`, and an explicit `null` are three
different outcomes, and pre-existing null values must survive
untouched.

### Example 1

```text
Input: obj = {"x": undefined, "y": [1, undefined, 2], "z": null}
Output: {"x": null, "y": [1, null, 2], "z": null}
Explanation: The undefined slots — obj.x and obj.y[1] — became null,
while the null already stored in obj.z was left exactly as it was.
```

### Example 2

```text
Input: obj = [undefined, {"k": undefined}]
Output: [null, {"k": null}]
Explanation: The root itself may be an array, and its first slot still
occupies index 0 after the swap; the nested object's key stays present,
now holding null.
```

### Example 3

```text
Input: obj = {"a": {"b": [undefined]}, "c": 0}
Output: {"a": {"b": [null]}, "c": 0}
Explanation: Nesting depth does not matter — the swap reaches every
level — and the falsy 0 beside it is untouched.
```

### Constraints

- obj is a valid JSON object or array
- 2 <= JSON.stringify(obj).length <= 10⁵
