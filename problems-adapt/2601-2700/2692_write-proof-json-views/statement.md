# Write-Proof JSON Views

## Description

Hand back a protected view of a parsed JSON value: reading anything
through the view behaves exactly like reading the original, while every
attempt to change something is refused with a thrown string.

Three kinds of attempts must fail, each with its own message:

- Writing a property of an object throws `Error Modifying: ${key}`.
- Writing an index of an array throws `Error Modifying Index: ${index}`.
- Calling one of an array's mutating methods throws
  `Error Calling Method: ${methodName}`. The only methods that can ever
  mutate an array are ['pop', 'push', 'shift', 'unshift', 'splice',
  'sort', 'reverse'].

What gets thrown must be the bare string, never an `Error` wrapper. And
a write that would store the very value already there still counts as
an attempt — it throws all the same.

The input `obj` is valid JSON, an object or an array, exactly as
`JSON.parse` produces it. Protection covers the whole structure: any
nested object or array reached through the view is guarded the moment
it is read, before anything can be written into it.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares the function `writeProof(obj)` plus a
class `Solution` whose `run(writeProofCase)` hands that function to the
bundle-provided case carrier: `writeProofCase.drive(writeProof)`. Each
case carries a JSON value `obj` and an arrow-function source `fn`
receiving the protected view of that `obj`; the carrier builds the view
with your function, evaluates `fn` against it, and records the outcome
— `{"value": <v>}` when `fn` returns normally, `{"error": "<message>"}`
when it throws. That recorded object is the judged answer, compared
exactly, so the thrown string must be byte-exact.

### Example 1

```text
Input:
obj = {
  "name": "ivy",
  "level": 4
}
fn = (obj) => {
  obj.level = 4;
  return obj.level;
}
Output: {"error": "Error Modifying: level"}
Explanation: Assigning a property is a write even when the stored value
does not change, so it throws before anything is touched.
```

### Example 2

```text
Input:
obj = ["w", "x", "y", "z"]
fn = (arr) => {
  arr[2] = null;
  return arr.length;
}
Output: {"error": "Error Modifying Index: 2"}
Explanation: An index write on an array is refused the same way, with
the offending index named in the message.
```

### Example 3

```text
Input:
obj = {
  "deck": [9, 5, 5, 1]
}
fn = (obj) => {
  obj.deck.splice(0, 2);
  return obj.deck.length;
}
Output: {"error": "Error Calling Method: splice"}
Explanation: Nested values are guarded too: reaching the inner array
through the view is enough, so its mutating splice call throws.
```

### Example 4

```text
Input:
obj = {
  "nums": [5, 6, 7],
  "label": "run"
}
fn = (obj) => {
  return [obj.nums.slice(1).join("-"), obj.label];
}
Output: {"value": ["6-7", "run"]}
Explanation: Nothing here attempts a change: plain reads, slice, and
join all pass through, so the function returns normally.
```

### Constraints

- obj is a valid JSON object or array
- `2 <= JSON.stringify(obj).length <= 10⁵`

## Hints

### Hint 1

A `Proxy` can stand in front of the value and vet every operation
before it lands — that one language feature carries the whole problem.

### Hint 2

Guard lazily, level by level: whenever a read through the view produces
an object or array, return a protected view of it instead of the raw
value, so depth is covered as the structure is explored.

### Hint 3

The `set` trap never writes anything — it only throws, picking between
the object message and the index message. On arrays the `get` trap
answers the seven mutating method names with a function that throws
when called, and lets every other read fall through untouched.
