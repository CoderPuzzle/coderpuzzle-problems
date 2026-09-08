# A Cache With A Curfew

## Description

Build a key-value store in which every entry carries an expiration. The
class exposes three methods:

- `set(key, value, duration)`: takes an integer key, an integer value,
  and a lifetime in milliseconds. Once that lifetime has run out, the key
  stops answering. The call returns true when the same key was already
  present and still un-expired, false otherwise; an existing key has both
  its value and its lifetime overwritten.
- `get(key)`: returns the stored value while the key is still live, and
  -1 once it has expired or was never set.
- `count()`: reports how many keys are currently un-expired.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class CurfewCache` with the three methods
above; the generated `class Solution` keeps its `run(cacheProbe)` method,
whose body hands your class to the bundle-provided driver:
`cacheProbe.drive(CurfewCache)`. The driver replays the case's
`actions`/`values` script against its per-action `timeDelays`, where
`timeDelays[i]` is the elapsed time in milliseconds from the replay's
start at which action i runs (the leading constructor action lands at
t=0). All time during the replay runs on a deterministic virtual clock —
`Date.now()` and `performance.now()` read simulated milliseconds, and
`setTimeout`/`clearTimeout` schedule and cancel against them — so a
natural implementation behaves exactly as it would against the wall
clock, without actually waiting. One transcript row is recorded per
action: null for the construction, then each method's return value (a
boolean from set, a number from get, a number from count). That recorded
transcript is the judged output shown as Output below.

### Example 1

```text
Input:
actions = ["CurfewCache", "set", "get", "count", "get"]
values = [[], [7, 91, 120], [7], [], [7]]
timeDelays = [0, 0, 60, 60, 200]
Output: [null, false, 91, 1, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, key 7 is set to 91 with a 120ms lifetime; no live entry existed,
so set reports false.
At t=60, get(7) still finds the entry and returns 91, and count() sees
one live key.
At t=120, key 7 expires.
At t=200, get(7) therefore reports -1.
```

### Example 2

```text
Input:
actions = ["CurfewCache", "set", "set", "get", "get", "get", "count"]
values = [[], [4, 8, 60], [4, 16, 200], [4], [4], [4], []]
timeDelays = [0, 0, 30, 40, 100, 250, 260]
Output: [null, false, true, 16, 16, -1, 0]
Explanation:
At t=0, the cache is constructed.
At t=0, key 4 is set to 8 for 60ms; nothing live existed, so false.
At t=30, key 4 is re-set to 16 for 200ms; a live entry existed, so true,
and the value and lifetime are overwritten (the entry now expires at
t=230).
At t=40 and t=100, get(4) returns the overwritten value 16.
At t=250, the entry has lapsed, so get(4) reports -1, and count() at
t=260 finds nothing live.
```

### Constraints

- `0 <= key, value <= 10⁹`
- `0 <= duration <= 1000`
- `1 <= actions.length <= 100`
- `actions.length === values.length`
- `actions.length === timeDelays.length`
- `0 <= timeDelays[i] <= 1450`
- `actions[i]` is one of "CurfewCache", "set", "get" and "count"
- The first action is always "CurfewCache" and executes immediately, at
  delay zero.

## Hints

### Hint 1

`ref = setTimeout(fn, delay)` schedules code for later, and
`clearTimeout(ref)` cancels it before it fires.

### Hint 2

Alongside each value, keep the timer that removes its key once the
lifetime has elapsed.

### Hint 3

Overwriting a live key means cancelling the timer the old entry left
behind.
