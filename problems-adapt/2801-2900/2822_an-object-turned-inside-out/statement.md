# An Object Turned Inside Out

## Description

Given an object or an array `obj`, return it turned inside out: an
inverted object where every value of `obj` becomes a key and every key
of `obj` becomes a value. An array's indices participate too, treated
as keys.

Values that repeat must not collide: when several keys of `obj` share
one value, the inverted object maps that value to an array holding all
of the corresponding keys.

It is guaranteed that the values in `obj` are only strings.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your entry point is a
class `Solution` with `run(caseRunner)`; inside it, call
`caseRunner.check(this)`. The case runner (a bundle-provided `FlipCase`)
then hands your `flipMapping(obj)` method the parsed structure and
compares your returned value against the expected inversion right
inside the harness: every distinct value of obj appears exactly once as
a key, mapped to the single originating key when unique or to an array
holding all of its originating keys in encounter order when duplicated,
while an array's indices ride along as string keys. Key order inside
the inverted object never matters.

### Example 1

```text
Input: obj = {"x": "10", "y": "20", "z": "30"}
Output: flipped = {"10": "x", "20": "y", "30": "z"}
Explanation: The keys from obj become the values, and the values from
obj become the keys.
```

### Example 2

```text
Input: obj = {"p": "q", "r": "q", "s": "t", "u": "q"}
Output: flipped = {"q": ["p","r","u"], "t": "s"}
Explanation: Three keys share the value "q", so the inverted object
maps "q" to an array of those keys in encounter order.
```

### Example 3

```text
Input: obj = ["7", "8", "7"]
Output: flipped = {"7": ["0","2"], "8": "1"}
Explanation: Arrays are objects too, so the indices become keys: the
repeated value "7" collects indices "0" and "2", and "8" maps to "1".
```

### Constraints

- obj is a valid JSON object or array
- typeof obj[key] === "string"
- 2 <= JSON.stringify(obj).length <= 10⁵
