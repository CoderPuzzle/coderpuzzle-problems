# Calls That Borrow A Context

## Description

Give every function a `borrow` method. The call `fn.borrow(obj, ...args)`
runs `fn` exactly once, but with `obj` standing in as `this` for the
duration of that call, while the remaining arguments are handed to `fn`
in order.

A plain call supplies no receiver at all: any property lookup through
`this` inside the function body misses, because nothing was lent. With
the method in place, the lookup sees exactly the object you passed.

For instance, given:

```js
function fare(zone, discount) {
    return this.base * zone - discount;
}
```

the bare call `fare(2, 1)` cannot succeed — the function reads
`this.base`, and no context was supplied. But
`fare.borrow({"base": 7}, 2, 1)` returns `13`: the object acts as the
receiver for that one call, and `2` and `1` arrive as `zone` and
`discount`.

Solve this without using the built-in `Function.call` method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`callWithContext(borrowCase)`, where `borrowCase` is a bundle-provided
`BorrowCase` carrying `.fn`, the callable built from the case's function
source; `.obj`, the context target (the first borrow argument); and
`.inputs`, the additional arguments for that single call. Enhance
`Function.prototype` with `borrow`, then return the result of invoking
`borrowCase.fn.borrow(borrowCase.obj, ...borrowCase.inputs)`. The
invoked function may return any JSON value — a number, string, boolean,
array, or object — or nothing at all, which is judged as null.

### Example 1

```text
Input:
fn = function bump(step) {
  return this.start + step;
}
obj = {"start": 40}
inputs = [2]
Output: 42
Explanation: The call lends {"start": 40} as the receiver, so this.start
is 40, and 2 arrives as step.
```

### Example 2

```text
Input:
fn = function tag(price, fee) {
  return `${this.item}: ${price + fee}`;
}
obj = {"item": "kettle"}
inputs = [9, 1]
Output: "kettle: 10"
Explanation: The receiver supplies item, while 9 and 1 are passed along
as price and fee, in order.
```

### Example 3

```text
Input:
fn = function flags() {
  return [this.on, !this.on];
}
obj = {"on": true}
inputs = []
Output: [true, false]
Explanation: A call with no additional arguments still works — only the
receiver is lent for the one call.
```

### Constraints

- `typeof args[0] == 'object'` and `args[0] != null`
- `1 <= args.length <= 100`
- `2 <= JSON.stringify(args[0]).length <= 10⁵`
