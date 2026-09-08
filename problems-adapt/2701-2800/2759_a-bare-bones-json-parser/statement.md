# A Bare-Bones JSON Parser

## Description

Implement a JSON reader of your own. You receive a string `str` holding
exactly one JSON value, and you must return the value that text
describes — what the platform's parser would hand back: objects as
key-to-value records, arrays as lists, and the scalars (strings,
numbers, booleans) plus null as they are written.

Solve it without the built-in `JSON.parse`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — the original provides no other languages for it.

### Example 1

```text
Input: str = '{"alpha":true,"beta":null}'
Output: {"alpha":true,"beta":null}
Explanation: The text describes an object with two keys: "alpha"
carries the boolean true and "beta" carries null.
```

### Example 2

```text
Input: str = '[-2.5,10,"ten"]'
Output: [-2.5,10,"ten"]
Explanation: The array lists three elements in order: a negative
fractional number, a whole number, and the four-character text "ten" —
a string, not a number.
```

### Example 3

```text
Input: str = '"plain"'
Output: "plain"
Explanation: A lone string is itself valid JSON; the quotes delimit the
value and the result is the text between them.
```

### Example 4

```text
Input: str = '{"grid":[[],{"spot":0}]}'
Output: {"grid":[[],{"spot":0}]}
Explanation: Containers nest freely: under the key "grid" sits an
array whose first element is an empty array and whose second is an
object with one numeric entry.
```

### Constraints

- `1 <= str.length <= 10⁵`
- `str` is a valid JSON text holding exactly one value: a string, a
  number, an array, an object, a boolean, or null
- `str` contains no whitespace and no escape sequences, so every string
  value runs from its opening quote to the very next quote and holds
  only printable characters

## Hints

### Hint 1

The grammar feeds itself: containers hold values, and those values can
be containers again. One routine that knows how to read a single value
can simply re-enter itself whenever it meets an opening bracket, and
return as soon as the bracket closes.

### Hint 2

Because strings carry no escapes, reading one is trivial — everything
up to the next quote. Likewise a number is just the run of characters
that may appear inside one, converted in a single step.
