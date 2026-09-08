# Hand-Rolled JSON Writer

## Description

Given a value, produce its JSON text yourself. The value may be a string, a
number, an array, an object, a boolean, or null.

The emitted text carries no extra whitespace. Keys appear in exactly the
order `Object.keys()` reports them, and objects and arrays may nest inside
each other arbitrarily.

The built-in `JSON.stringify` is off limits — writing the serializer is the
exercise.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`stringifyValue(valueCase)`, where `valueCase` is a bundle-provided
`ValueCase` carrying `.object`, the live decoded value to serialize, with
property order exactly as listed in the case data. Return the JSON text as
a string; every judged value stays well inside JavaScript's exact-number
range, and all case strings contain only alphanumeric characters.

### Example 1

```text
Input: object = {"late":3,"early":1,"middle":2}
Output: {"late":3,"early":1,"middle":2}
Explanation:
Return the JSON text of the value.
Keys stay in the order Object.keys() reports them — insertion order here —
so "late" is written first even though "early" sorts ahead of it.
```

### Example 2

```text
Input: object = {"name":"zed","score":-40,"alive":false,"tag":null}
Output: {"name":"zed","score":-40,"alive":false,"tag":null}
Explanation:
JSON's primitive ingredients — strings, numbers, booleans, and null — all
appear in one object.
```

### Example 3

```text
Input: object = {"box":{"inner":[[],7,"Alpha"]}}
Output: {"box":{"inner":[[],7,"Alpha"]}}
Explanation:
Containers hold containers: the object wraps an object wrapping an array,
one of whose items is an empty array.
```

### Example 4

```text
Input: object = false
Output: false
Explanation:
A bare primitive is a legal input on its own.
```

### Constraints

- `value is a valid JSON value`
- `1 <= JSON.stringify(object).length <= 10⁵`
- `nesting is at most 1000 levels deep`
- `all strings contain only alphanumeric characters`

## Hints

### Hint 1

Sort the cases first: the value is an array, a plain object, a string, or
one of the remaining scalars.

### Hint 2

Recursion does the heavy lifting — once you can stringify a smaller piece,
the whole is easy to assemble.

### Hint 3

A string is its value wrapped in double quotes; the other scalars print via
`String`. An array is its stringified items joined by commas inside
brackets; an object is its key-value pairs, each value stringified the same
way, joined by commas inside braces.
