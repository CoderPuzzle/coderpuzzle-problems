# An Echo For Every String

## Description

Enhance the string type so that any string accepts a `.echo(x)` call and
answers with itself repeated `x` times. Leave the built-in `repeat`
method alone — producing the repetition is the exercise.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`solve(echoCase)`, where `echoCase` is a bundle-provided `EchoCase`
carrying `.str`, the string under test, and `.times`, the count `echo(x)`
must return it repeated by. Enhance `String.prototype` with `echo`, then
return the result of calling
`String.prototype.echo.call(echoCase.str, echoCase.times)` — `.str`
repeated `.times` times.

### Example 1

```text
Input: str = "ha", times = 3
Output: "hahaha"
Explanation: "ha" echoed 3 times is "hahaha".
```

### Example 2

```text
Input: str = "open", times = 7
Output: "openopenopenopenopenopenopen"
Explanation: "open" echoed 7 times is the 28-character string shown.
```

### Example 3

```text
Input: str = "z", times = 1
Output: "z"
Explanation: An echo count of 1 returns the string unchanged.
```

### Constraints

- `1 <= times <= 10⁵`
- `1 <= str.length <= 1000`

### Follow up

Assume, just to make the analysis tractable, that concatenating two
strings costs O(1) no matter their lengths. Under that assumption, can
you build `echo` so it runs in O(log n) time?
