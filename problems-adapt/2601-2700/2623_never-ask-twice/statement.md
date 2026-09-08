# Never Ask Twice

## Description

Wrap a function so that no argument list ever reaches it twice: the first
call with a given set of arguments runs the real function, and every
later call with those same arguments is answered from the cache instead.

Three underlying functions can appear:

- `sum` takes integers `a` and `b` and returns `a + b`. Argument order
  matters for caching: a value stored for `(b, a)` with `a != b` must not
  serve a call to `(a, b)` — so `(2, 3)` and `(3, 2)` each cost the
  underlying function one real call.
- `fib` takes one integer `n` and returns 1 when `n <= 1`, otherwise
  `fib(n - 1) + fib(n - 2)`.
- `factorial` takes one integer `n` and returns 1 when `n <= 1`,
  otherwise `factorial(n - 1) * n`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `function cacheResults(fn)` with the
behavior above; the generated `class Solution` keeps its
`run(memoProbe)` method, whose body hands your function to the
bundle-provided driver: `memoProbe.drive(cacheResults)`. The driver
builds the underlying function named by the case's `fnName` (counting
every real call it receives), then replays the case's `actions`/`values`
script against your wrapper — `call` rows push the arguments through and
record what comes back, while `getCallCount` rows record how many times
the underlying function has actually run so far. The recorded transcript
is the judged output shown as Output below.

### Example 1

```text
Input:
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[3,4],[3,4],[],[4,3],[]]
Output: [7,7,1,7,2]
Explanation: The repeat of (3, 4) is served from the cache, while (4, 3)
is a different key and costs one more real call — two in total.
```

### Example 2

```text
Input:
fnName = "factorial"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[4],[4],[],[6],[]]
Output: [24,24,1,720,2]
Explanation: A cached 4! costs nothing to repeat; 6! is a fresh argument
list, so the underlying function runs a second time.
```

### Example 3

```text
Input:
fnName = "fib"
actions = ["call","getCallCount"]
values = [[7],[]]
Output: [21,1]
Explanation: The one call to fib(7) recurses internally, but the
underlying function seen by the wrapper was invoked exactly once.
```

### Constraints

- `0 <= a, b <= 10⁵`
- `1 <= n <= 10`
- `1 <= actions.length <= 10⁵`
- `actions.length === values.length`
- `actions[i]` is one of "call" and "getCallCount"
- `fnName` is one of "sum", "factorial" and "fib"

## Hints

### Hint 1

The wrapper can accept the incoming arguments as a rest array and
forward them with spread syntax.

### Hint 2

The argument array holds only numbers, so it can be turned into a string
key with `JSON.stringify()`.

### Hint 3

Keep a Map in the outer function; the inner function consults it first
and only calls through when the key is new.
