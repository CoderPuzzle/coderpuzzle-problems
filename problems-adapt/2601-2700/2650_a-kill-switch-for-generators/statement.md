# A Kill Switch For Generators

## Description

Long-running work expressed as a generator sometimes needs to be stopped
before it finishes. For that, write a function `abortable` that takes a
generator object and returns an array of two values: a cancel function
and a promise.

The generator will only ever yield promises. Servicing those promises is
your function's job: when a yielded promise fulfills, feed the resolved
value back into the generator, and when one rejects, throw that error
back into it.

Calling the cancel function before the generator finishes injects the
string "Cancelled" (a plain string, not an Error object) into the
generator as a thrown error. If the generator catches it, execution
continues and the returned promise eventually settles with whatever the
generator yields or returns next; if the generator lets it escape, the
returned promise rejects with that string. Nothing beyond that should
keep running.

When the generator runs to completion, the returned promise fulfills
with the value the generator returned; if the generator itself throws,
the promise rejects with that error.

A sketch of the intended usage:

    function* tasks() {
      const val = yield new Promise(resolve => resolve(2 + 2));
      yield new Promise(resolve => setTimeout(resolve, 100));
      return val + 1; // calculation shouldn't be done.
    }
    const [cancel, promise] = abortable(tasks());
    setTimeout(cancel, 50);
    promise.catch(console.log); // logs "Cancelled" at t=50ms

Had cancel() never fired, or fired only after t=100ms, the promise would
have resolved 5 instead.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — no other languages are offered for it — and its timing runs on a
deterministic virtual clock instead of real timers. The bundle-provided
`AbortCase` carries `.source`, the case's `generatorFunction` source (it
arms its internal promise delays against the same virtual clock, because
`setTimeout` itself is captured by the harness), plus `.cancelledAt`.
Your submission defines `abortable(generator)` returning
`[cancel, promise]` exactly as above and declares a class `Solution`
whose `run(abortCase)` hands that function over with
`return abortCase.drive(abortable)`: the driver instantiates the
generator, calls `abortable(generator)` once, schedules
`setTimeout(cancel, cancelledAt)` when `cancelledAt` is not null, pumps
every scheduled settlement in due-time order, and awaits your returned
promise. The judged answer is the outcome object:
`{"resolved": <settlement value>}` when the promise fulfills or
`{"rejected": <rejection reason>}` when it rejects (values of `undefined`
normalize to null).

### Example 1

```text
Input:
generatorFunction = function*() {
  return 81;
}
cancelledAt = 90
Output: {"resolved": 81}
Explanation: The generator finishes the instant it starts, so the
returned promise resolves 81 immediately. Cancelling a generator that
is already done does nothing.
```

### Example 2

```text
Input:
generatorFunction = function*() {
  yield new Promise(res => setTimeout(res, 240));
  return "late";
}
cancelledAt = 130
Output: {"rejected": "Cancelled"}
Explanation: The cancel call lands at t=130 ms, in the middle of the
240 ms wait. The "Cancelled" string is thrown into the generator, which
has no try/catch, so the returned promise rejects with it.
```

### Example 3

```text
Input:
generatorFunction = function*() {
  let sum = 0;
  try {
    yield new Promise(res => setTimeout(res, 60));
    sum += yield new Promise(res => res(5));
    yield new Promise(res => setTimeout(res, 60));
    sum += yield new Promise(res => res(7));
  } catch (e) {
    return sum;
  }
  return sum;
}
cancelledAt = 90
Output: {"resolved": 5}
Explanation: The first wait finishes and the immediately-resolved 5
pushes the sum to 5. The cancel at t=90 ms arrives while the second
60 ms wait is still pending; the generator catches the injected
"Cancelled" and returns the partial sum, which the promise resolves.
```

### Example 4

```text
Input:
generatorFunction = function*() {
  try {
    yield new Promise((resolve, reject) => reject("door stuck"));
  } catch (e) {
    const x = yield new Promise(res => res(30));
    return x + 12;
  }
}
cancelledAt = null
Output: {"resolved": 42}
Explanation: The first yielded promise rejects at once; the error is
thrown back into the generator, caught there, and execution carries on
normally, ending in 30 + 12 = 42. No cancel is ever scheduled.
```

### Constraints

- `cancelledAt == null or 0 <= cancelledAt <= 1000`
- `generatorFunction returns a generator object`

## Hints

### Hint 1

The heart of this problem is two-way traffic between a generator and the
code driving it — the same technique libraries such as redux-saga are
built on.

### Hint 2

Calling `generator.next(X)` resumes the generator with `X` as the value
of its current `yield` expression, which is how a resolved value travels
back in.

### Hint 3

Calling `generator.throw(err)` makes the generator resume by raising
`err` at its current `yield` point; if the generator body has no
handler, that error propagates out of the call.
