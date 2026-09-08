# Any Method You Name

## Description

Build a function that returns an object answering to every method.

Call the object with any method name at all, and the call hands back
that very name. `obj.hello91()` answers `"hello91"`; a name of pure
punctuation answers itself just the same.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`callMethod(anyMethodProbe)`, where `anyMethodProbe` is a bundle-provided
`AnyMethodProbe` carrying `.method`, the name of the method under test.
Declare `makeAnyMethodObject()` as well, then return the result of
calling the method named by `anyMethodProbe.method` on an object from
`makeAnyMethodObject()` — the method's own name.

### Example 1

```text
Input: method = "fetch42"
Output: "fetch42"
Explanation:
const obj = makeAnyMethodObject();
obj['fetch42'](); // "fetch42"
The answer always echoes the method name back.
```

### Example 2

```text
Input: method = ""
Output: ""
Explanation: Even the empty name is a name — the object must answer it
with itself.
```

### Example 3

```text
Input: method = "~#Zz_9^!"
Output: "~#Zz_9^!"
Explanation: No character is off limits; punctuation-only names behave
exactly like ordinary ones.
```

### Constraints

- `0 <= method.length <= 1000`

## Hints

### Hint 1

A fixed set of methods can never cover names no one has declared yet —
the object needs to invent each method at the moment someone asks for it.

### Hint 2

JavaScript's Proxy lets you intercept property reads before any
prototype lookup; the read can hand back a function instead of a value.

### Hint 3

That returned function only needs to remember one thing: the property
name it was fetched for.
