# Deep Equality For JSON Values

## Description

Given two JSON values `o1` and `o2`, decide whether they are deeply equal
— identical all the way down.

The values agree when one of these holds:

- Both are primitives, and they pass the `===` check.
- Both are arrays of the same length, with deeply equal elements in the
  same order.
- Both are objects carrying exactly the same key set, with deeply equal
  values under every shared key. The order in which keys were inserted
  never matters.

Both inputs arrive as the result of `JSON.parse` — valid JSON, and nothing
but JSON.

Do not reach for lodash's `_.isEqual()`; write the comparison yourself.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Each case stores its two values as raw JSON text; the bundle-provided
case carrier runs that text through JSON.parse exactly as quoted above, so
your code receives genuine JavaScript values. Declare
`function valuesEqual(o1, o2)` plus a class `Solution` whose `deepEqual`
method hands your function to the carrier: it reads
`jsonEqualityCase.o1` and `.o2`, returning
`valuesEqual(jsonEqualityCase.o1, jsonEqualityCase.o2)`. That returned
boolean is the judged answer, compared exactly.

### Example 1

```text
Input: o1 = {"a":[1,{"b":4}],"c":9}, o2 = {"a":[1,{"b":4}],"c":9}
Output: true
Explanation: Every container and every leaf agrees: the outer object's
keys, the array's two elements, the inner object's single key, and the
plain numbers.
```

### Example 2

```text
Input: o1 = {"c":9,"a":[1,{"b":4}]}, o2 = {"a":[1,{"b":4}],"c":9}
Output: true
Explanation: The same values with the outer keys written in the opposite
order — key order carries no meaning, so the objects are deeply equal.
```

### Example 3

```text
Input: o1 = {"n":[0,false]}, o2 = {"n":[0,0]}
Output: false
Explanation: The second array slot holds false on one side and 0 on the
other. Different primitive types never pass ===, so the pair fails even
though JSON.stringify renders both as similar-looking text.
```

### Example 4

```text
Input: o1 = 7, o2 = "7"
Output: false
Explanation: A number and a string of the same digit are distinct
primitives.
```

### Constraints

- `1 <= JSON.stringify(o1).length <= 10⁵`
- `1 <= JSON.stringify(o2).length <= 10⁵`
- maxNestingDepth <= 1000

## Hints

### Hint 1

`Array.isArray()` separates arrays from everything else;
`typeof v === "object" && v !== null` separates plain objects from
primitives; `Object.keys()` lists an object's keys.

### Hint 2

Two containers of different kinds, arrays of different lengths, or objects
whose key sets differ can be failed immediately.

### Hint 3

Compare children pairwise and recurse — the base case is a pair of
primitives, decided by a plain `===`.
