# Merging Two JSON Values

## Description

Write a function `deepCombine` that folds two parsed-JSON values into a
single merged value. The folding proceeds recursively:

- When both sides are objects, the result carries the union of their
  keys. A key both sides own merges their two values the same way; a
  key only one side owns contributes that side's value as-is.
- When both sides are arrays, the result takes the length of the longer
  array and merges position by position as if each index were a key:
  positions both sides have merge their entries, positions only one
  side has contribute that side's entry.
- For any other pairing of values — different container kinds, a
  container against a primitive, or two primitives — the result is
  simply obj2. This rule is what makes null and the scalar values
  (strings, numbers, booleans) the leaves where recursion stops.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — the original provides no other languages for it.

### Example 1

```text
Input: obj1 = {"x": 10, "z": {"p": 1}}, obj2 = {"x": 20, "w": [4, 5]}
Output: {"x": 20, "z": {"p": 1}, "w": [4, 5]}
Explanation: Both sides own "x", but 10 and 20 are primitives, so
obj2's 20 wins. "z" belongs to obj1 alone and "w" to obj2 alone, so
each keeps its own value.
```

### Example 2

```text
Input: obj1 = [1, [2], {}], obj2 = [[9], 8]
Output: [[9], 8, {}]
Explanation: Position 0 pairs the number 1 with the array [9], which
is not a same-kind match, so [9] takes over. Position 1 pairs [2] with
the number 8 and 8 takes over for the same reason. The result runs to
obj1's length of 3, and position 2 exists only in obj1, so {} stays.
```

### Example 3

```text
Input: obj1 = {"list": [{"a": 1}, 2]}, obj2 = {"list": [{"b": 3}], "tail": true}
Output: {"list": [{"a": 1, "b": 3}, 2], "tail": true}
Explanation: Under "list", position 0 holds an object on both sides,
so the two merge into one object holding both keys. Position 1 exists
only in obj1 and survives untouched. The key "tail" is obj2-only and
is adopted wholesale.
```

### Example 4

```text
Input: obj1 = [1, 2], obj2 = {"k": 1}
Output: {"k": 1}
Explanation: An array paired with an object is not a same-kind match,
so the whole answer is obj2.
```

### Constraints

- obj1 and obj2 are valid JSON values
- 1 <= JSON.stringify(obj1).length <= 5 * 10⁵
- 1 <= JSON.stringify(obj2).length <= 5 * 10⁵

### Follow-up

Can you avoid allocating a brand-new container for the regions of the
answer that obj2 never disagrees with?

## Hints

### Hint 1

Recursion continues only when the two values are containers of the same
kind — two objects, or two arrays. Careful with null in JavaScript:
`typeof null` reports `"object"`, yet null behaves like any scalar and
is overwritten wholesale.

### Hint 2

Positions or keys that exist on a single side need no work — copy the
value through. The only spots that recurse are shared keys or indices
whose two values are again containers of the same kind.
