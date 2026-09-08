# Answers To The Class

## Description

Handed an arbitrary JavaScript value and a class, decide whether that value
is an instance of the class or of any of its superclasses. Here "is an
instance of" means the value can reach the class's methods — its prototype
chain passes through the class's prototype object.

Either argument can be anything JavaScript allows, including `undefined`,
primitives, built-in constructors, or freshly declared classes.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(instanceProbe)`, where `instanceProbe` is a bundle-provided
`InstanceProbe` carrying `.obj`, the value on the left of the check, and
`.cls`, the class on the right. Both arrive as live JavaScript values,
built by the judge from declarative descriptors: `{"kind": "undefined"}`
turns into `undefined`, `{"kind": "null"}` into `null`, `{"kind": "value",
"value": v}` into the plain JSON scalar, array, or object `v`, `{"kind":
"date"}` into a fixed `Date`, `{"kind": "builtin", "name": X}` into the
built-in constructor called `X`, and `{"kind": "arrow"}` into an arrow
function. Classes declared in the probe's table (a `name` plus the class it
`extends`) can be named as `{"kind": "named", "name": N}` for the
constructor itself or `{"kind": "instance", "of": N}` for a fresh instance
of it. Define `answersTo(obj, cls)` at top level with the obvious
two-argument shape, then let `solve` return its verdict for the probe's
pair — the judged answer is exactly that boolean.

### Example 1

```text
Input: obj = true, cls = Boolean
Output: true
Explanation: A primitive has no prototype of its own, but the first method
lookup boxes it, so the value reaches Boolean.prototype and answers to the
class even though the instanceof keyword would say false.
```

### Example 2

```text
Input: obj = new Electric(), cls = Instrument, where Electric extends
Guitar and Guitar extends Instrument
Output: true
Explanation: The chain climbs Electric to Guitar to Instrument, so a fresh
Electric answers to every rung above it.
```

### Example 3

```text
Input: obj = new Shape(), cls = Circle, where Circle extends Shape
Output: false
Explanation: A base instance knows nothing of its subclasses — the walk
ends at Object.prototype without ever meeting Circle.prototype.
```

### Example 4

```text
Input: obj = new Date(), cls = Plant, where Plant is a declared class with
no superclass
Output: false
Explanation: A date's chain runs through Date.prototype and
Object.prototype only; the declared class's prototype is never on it.
```

### Constraints

- Each case carries exactly one `(obj, cls)` pair, and each side may be
  any of the descriptor kinds above, so either position can hold
  `undefined` or any other JavaScript value.
- A case's declared class table has at most thirty entries, and no
  inheritance chain runs more than thirty links deep.
- `solve` returns its one boolean synchronously.

## Hints

### Hint 1

Inheritance in JavaScript rides entirely on the prototype chain.

### Hint 2

`Object.getPrototypeOf(x)` hands you the next link of `x`'s chain;
`x.__proto__` reads the same link.

### Hint 3

The thing to match against is `cls.prototype`.

### Hint 4

Climb the chain link by link; return true on the first match and false
once the chain bottoms out.
