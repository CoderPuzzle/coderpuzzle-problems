# A Bus For Events

## Description

Design an event bus. It keeps a per-event list of subscribers and, when
a name is emitted, fans that single occurrence out to all of them — the
same idea Node's `EventEmitter` and the DOM's `EventTarget` are built
on, cut down to two methods:

- `subscribe` takes an event name and a callback, and registers the
  callback under that name. One event may carry any number of
  subscribers, and a later emission runs each of them in the order they
  signed up, collecting one result per callback. You can rely on no two
  callbacks handed to subscribe ever being the same function object.
  subscribe also hands back an object with an `unsubscribe` method:
  calling it removes exactly that callback from the bus and returns
  `undefined`.
- `emit` takes an event name and an optional array of arguments. If the
  name has no subscribers, emit returns `[]`. Otherwise every
  subscriber runs — each receives that array as its arguments — and
  emit returns the callbacks' return values in subscription order.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class EventBus` with the two methods
above; the generated `class Solution` keeps its `run(busCase)` method,
whose body hands your class to the bundle-provided driver:
`busCase.drive(EventBus)`. The driver replays the case's
`actions`/`values` script — it constructs your class at the `EventBus`
action, builds each callback from its function source, requires
`subscribe` to return an object with an `unsubscribe` method and `emit`
to return an array, and records one output row per action: `[]` for the
construction, `["subscribed"]` for each `subscribe`, `["emitted",
results]` for each `emit` (every callback return, in subscribe order),
and `["unsubscribed", index]` for each `unsubscribe`. That recorded
transcript is the judged output shown as `Output` below.

### Example 1

```text
Input:
actions = ["EventBus", "subscribe", "subscribe", "emit", "emit"],
values = [[], ["gear", "function spin() { return 'whir'; }"],
["gear", "() => 'click'"], ["gear"], ["gear"]]
Output: [[],["subscribed"],["subscribed"],["emitted",["whir","click"]],["emitted",["whir","click"]]]
Explanation:
const bus = new EventBus();
bus.subscribe("gear", function spin() { return 'whir'; });
bus.subscribe("gear", () => 'click');
bus.emit("gear"); // ["whir", "click"], in subscribe order
bus.emit("gear"); // both subscribers stay registered, so again ["whir", "click"]
```

### Example 2

```text
Input:
actions = ["EventBus", "subscribe", "emit"],
values = [[], ["totals", "(...parts) => parts.reduce((a, b) => a + b, 0)"],
["totals", [4, 9, 1]]]
Output: [[],["subscribed"],["emitted",[14]]]
Explanation: emit's second argument is optional — when present, its
elements become the callback's arguments. Here the callback receives
4, 9, and 1 and sums them to 14.
```

### Example 3

```text
Input:
actions = ["EventBus", "subscribe", "subscribe", "unsubscribe", "emit"],
values = [[], ["lane", "n => n * 3"], ["lane", "n => n + 3"], [1],
["lane", [5]]]
Output: [[],["subscribed"],["subscribed"],["unsubscribed",1],["emitted",[15]]]
Explanation:
const bus = new EventBus();
const first = bus.subscribe("lane", n => n * 3);
const second = bus.subscribe("lane", n => n + 3);
second.unsubscribe(); // removes only the second subscription
bus.emit("lane", [5]); // [15], only the first subscriber remains
```

### Constraints

- `1 <= actions.length <= 10`
- `values.length === actions.length`
- Every script is valid — there is never an unsubscribe for a
  subscription that does not exist.
- Only four actions appear: EventBus, emit, subscribe, and unsubscribe.
- The EventBus action carries no arguments.
- The emit action carries one or two arguments: first the event name to
  emit, then optionally the array passed on to the callbacks.
- The subscribe action carries two arguments: the event name and the
  callback function.
- The unsubscribe action carries one argument: the 0-indexed position
  of an earlier subscription.
