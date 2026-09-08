# A Single-Use Function

## Description

Take a function `fn` and hand back a wrapper that behaves exactly like
it — with one restriction: the wrapped body may run at most once.

That first wrapped call must return precisely what `fn` would return for
its arguments. Every later call answers with `undefined` and never
reaches `fn` again.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — no other languages are offered for it. Your submission declares
`function atMostOnce(fn)` with the behavior above; the generated `class
Solution` keeps its `run(singleUseCase)` method, whose body hands your
function to the bundle-provided driver:
`singleUseCase.drive(atMostOnce)`. The driver builds the case's
underlying function from its source string, wraps it in a call counting
shim, then replays the case's `calls` rows through your wrapper — each
row's arguments pass through in order, and any row after the first must
come back as `undefined` or the driver rejects the run outright. The
judged verdict is `[{"calls": K, "value": V}]` shown as Output below:
how many times the underlying function actually ran, and what its single
real invocation returned.

### Example 1

```text
Input:
fn = (w) => (w.split("").reverse().join(""))
calls = [["listen"],["silent"]]
Output: [{"calls":1,"value":"netsil"}]
Explanation:
const onceW = atMostOnce(fn);
onceW("listen"); // "netsil"
onceW("silent"); // undefined, fn was not called again
```

### Example 2

```text
Input:
fn = (t) => (t.trim().length)
calls = [["  coderpuzzle  "],["x"]]
Output: [{"calls":1,"value":6}]
Explanation: The first row runs fn and reports the trimmed length 6;
the second row is turned away with undefined.
```

### Example 3

```text
Input:
fn = (n) => (Array.from({length: n}, (_, i) => (i * i)))
calls = [[4],[9]]
Output: [{"calls":1,"value":[0,1,4,9]}]
Explanation: Only the first request builds the squares list; the second
never reaches fn, so the run count stays at 1.
```

### Constraints

- `calls` is a valid JSON array
- `1 <= calls.length <= 10`
- `1 <= calls[i].length <= 100`
- `2 <= JSON.stringify(calls).length <= 1000`
