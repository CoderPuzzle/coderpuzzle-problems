# Wrapping A Callback Into A Promise

## Description

Old-style functions report their outcome through a callback; modern code
awaits promises. Write a function that takes one such callback-style
function and hands back its promise-flavored twin.

The function `fn` receives a callback as its first argument, followed by
any number of plain arguments. The wrapper you return is called with
those same plain arguments (no callback), and gives back a promise:

- when `fn` later invokes the callback with a single argument, the
  promise settles as fulfilled with that first argument as its value;
- when `fn` passes a second argument, that second argument is an error
  and the promise settles as rejected with it — passed along verbatim,
  whatever the first argument held.

For instance, this callback-style function computes a product and
reports failure through the callback's second parameter:

```javascript
function multiply(callback, ...numbers) {
    const total = numbers.reduce((product, n) => product * n, 1);
    if (numbers.some((n) => n < 0)) {
        callback(undefined, Error("negative input"));
    } else {
        callback(total);
    }
}
```

Its promise-based equivalent would instead `return total` or
`throw Error("negative input")` — your wrapper is what stands between
the two styles.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines the conversion function
`callbackToPromise` and declares a class `Solution` whose
`run(callbackDriver)` hands it to the bundle-provided driver:
`callbackDriver.drive(callbackToPromise)`. Each case names a
callback-style `fn` (a sum or product over the case's args, rejecting
with the case's message when one is present) and the args to call the
wrapped version with. The driver builds `fn`, gives it to your
conversion function, calls the returned wrapper with the plain args,
and records the settlement — `{"resolved": value}` or
`{"rejected": error}` — as the judged answer, compared exactly.

### Example 1

```text
Input:
fn = (callback, a, b, c) => {
    callback(a + b + c);
}
args = [4, 10, 11]
Output: {"resolved": 25}
Explanation:
const asyncFunc = callbackToPromise(fn);
asyncFunc(4, 10, 11).then(console.log); // 25

fn receives the injected callback plus the plain args, and resolves 25.
```

### Example 2

```text
Input:
fn = (callback, a, b) => {
    callback(a * b, "Inputs Rejected");
}
args = [2, 9]
Output: {"rejected": "Inputs Rejected"}
Explanation:
const asyncFunc = callbackToPromise(fn);
asyncFunc(2, 9).catch(console.log); // "Inputs Rejected"

The second callback argument is the error, so the promise rejects with
that exact string. The first argument (the computed 18) is ignored —
the presence of an error position decides the settlement.
```

### Example 3

```text
Input:
fn = (callback, a) => {
    callback(a);
}
args = [7]
Output: {"resolved": 7}
Explanation: Forwarding must be arity-free: a single plain argument
arrives after the injected callback and resolves the promise with 7.
```

### Constraints

- `1 <= args.length <= 100`
- `0 <= args[i] <= 10⁴`
