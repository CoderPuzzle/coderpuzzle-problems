# A Bind Polyfill

## Description

Implement `bindPolyfill`, a hand-rolled stand-in for the language's
built-in `Function.prototype.bind`. When `bindPolyfill` is invoked on a
function with an object passed in, that object must become the `this`
context the function observes — on this call and on every call after.

Consider:

```js
function whoami() {
    return "role: " + this.role;
}
```

Bound and then called:

```js
const bound = whoami.bindPolyfill({ role: "cashier" });
bound();
```

the invocation must behave exactly as if `whoami` were a method of that
object, returning `"role: cashier"`.

Solve it without the built-in `Function.bind`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`bindWithContext(bindCase)`, where `bindCase` is a bundle-provided
`BindCase` exposing `.fn` (the callable built from the case's function
source), `.obj` (the binding target), and `.inputs` (the argument list
of the single observed invocation). Add `bindPolyfill` to
`Function.prototype`, then return the result of calling
`fn.bindPolyfill(obj)` with the entries of `inputs` forwarded as
arguments. The invoked function may return any JSON value — a number,
string, boolean, array, or object — or nothing at all, which is judged
as null.

### Example 1

```text
Input:
fn = function discount(rate) {
  return this.price * rate;
}
obj = {"price": 80}
inputs = [0.5]
Output: 40
Explanation:
const bound = fn.bindPolyfill({"price": 80});
bound(0.5); // 40
The context is set to {"price": 80} and 0.5 is forwarded as the rate,
so the lookup of this.price inside the call sees 80.
```

### Example 2

```text
Input:
fn = function greet() {
  return "Hello, " + this.user;
}
obj = {"user": "Sam"}
inputs = []
Output: "Hello, Sam"
Explanation:
The bound wrapper is called with no arguments, and this.user resolves
against the bound object.
```

### Example 3

```text
Input:
fn = function joinAll(sep) {
  return this.parts.join(sep);
}
obj = {"parts": ["a", "b", "c"]}
inputs = ["-"]
Output: "a-b-c"
Explanation:
A method's worth of work runs on data stored in the bound object, with
the forwarded separator deciding the glue.
```

### Constraints

- `obj` is a non-null object
- `0 <= inputs.length <= 100`

### Follow-up

Can you get by without reaching for any built-in methods at all?

## Hints

### Hint 1

The easy route is the built-in `fn.apply()`.

### Hint 2

With no built-ins, find a way to invoke the function from the context
object itself — a call made through the object assigns it as `this`.

### Hint 3

Create a new `Symbol()`, attach the function to the context object
under that symbol, then call the function through the object.
