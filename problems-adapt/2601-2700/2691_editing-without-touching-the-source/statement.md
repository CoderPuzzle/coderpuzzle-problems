# Editing Without Touching The Source

## Description

Handing callers editable views of a shared object usually means either
letting them scribble over the real thing or cloning everything up
front. Write a class `CopyOnWriteEditor` that avoids both. The
constructor takes the guarded value `obj` — a JSON object or array.

The class exposes one method, `produce`, which accepts a mutator
function and returns a new value shaped like the original except for
whatever the mutator changed. The mutator receives a stand-in for `obj`
that it may edit freely; those edits land in the returned copy, and the
guarded `obj` itself stays exactly as it was.

For example:

```js
const originalObj = { x: 5 };
const editor = new CopyOnWriteEditor(originalObj);
const newObj = editor.produce((proxy) => {
    proxy.x = proxy.x + 1;
});
console.log(originalObj); // {"x": 5}
console.log(newObj); // {"x": 6}
```

Properties of the mutator function:

- It always returns undefined.
- It never reads keys that do not exist.
- It never deletes keys (`delete obj.key`).
- It never calls methods on a proxied object (push, shift, etc).
- It never assigns objects (`proxy.x = {}`).

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Judging compares only the differences between each produced value
and the original `obj` — a full structural diff is too expensive — and
any change that leaks into the original fails the case. Your submission
declares `class Solution` with the method `run(mutationReplay)`, where
`mutationReplay` is a bundle-provided `MutationReplay` carrying `.obj`,
the guarded value, and `.mutators`, the list of encoded mutation scripts
to apply. Declare `class CopyOnWriteEditor` as well, then call
`mutationReplay.drive(CopyOnWriteEditor)`: the driver constructs your
editor on `mutationReplay.obj` and runs `produce` once per script with a
function that applies that script's edits to the stand-in. The judged
verdict pairs the array of produced results with `mutationReplay.obj`
after all calls — the original must still equal its initial JSON.

### Example 1

```text
Input:
obj = {"count": 7},
mutators = [
  count = count + 3,
  count = count * 2
]
Output:
[
  {"count": 10},
  {"count": 14}
]
Explanation:
const editor = new CopyOnWriteEditor({count: 7});
editor.produce(proxy => { proxy.count += 3; }); // {"count": 10}
editor.produce(proxy => { proxy.count *= 2; }); // {"count": 14}
Each call starts again from the untouched source, so the second
mutator's 14 builds on 7, not on the first call's 10.
```

### Example 2

```text
Input:
obj = {"list": [4, 5, 6]}
mutators = [
  set list[1] = 50; set double = list[1] * 2
]
Output:
[
  {"list": [4, 50, 6], "double": 100}
]
Explanation: The write to list[1] is visible to the later read in the
same script, so "double" picks up 100. The original array still reads
[4, 5, 6] afterwards.
```

### Example 3

```text
Input:
obj = {"a": {"u": 3, "v": 8}}
mutators = [
  swap a.u and a.v
]
Output:
[
  {"a": {"u": 8, "v": 3}}
]
Explanation: The two nested leaves exchange values inside the produced
copy; the nested original is left alone.
```

### Constraints

- `2 <= JSON.stringify(obj).length <= 4 * 10^5`
- `mutators` is an array of functions
- total calls to `produce()` < `10^5`

## Hints

### Hint 1

A Proxy can stand in for the original and record every write without
forwarding it to the real object.

### Hint 2

Track which leaf values each produce call replaced — those are the only
spots where the copy and the source differ.

### Hint 3

A shadow tree parallel to the original, holding just the edited paths,
keeps that record cheap.

### Hint 4

When produce finishes, build the result by rebuilding only the spine
from the root down to edited nodes and reusing the original references
everywhere else — cloning the whole object would be wasteful.
