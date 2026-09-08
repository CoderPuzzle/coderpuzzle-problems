# Repeating Until Cancelled

## Description

Given a function fn, an array of arguments args, and an interval time t in
milliseconds, write a function `repeatable(fn, args, t)` that runs fn
right away and then keeps re-running it every t milliseconds, handing
back a function cancelFn that stops the repetition.

fn's very first execution happens immediately, before any timer exists;
every later execution is scheduled t milliseconds after the previous one
and always receives the same args. When cancelFn runs, the schedule
stops — executions that already happened are left untouched.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. It is judged on a deterministic virtual clock instead of real
timers: your submission declares `function repeatable(fn, args, t)` plus
a class Solution whose `run` method hands your function to the
bundle-provided driver: `tickerCase.drive(repeatable)`. During `drive`
the driver replaces the global `setTimeout`/`clearTimeout` and
`setInterval`/`clearInterval` with virtual-clock equivalents, constructs
your `repeatable(fn, args, t)` (fn records the transcript: every actual
execution pushes one row `{"time": <virtual execution time>, "returned":
<the value fn returned>}`), schedules the returned cancelFn at the case's
`cancelTimeMs`, then drains every scheduled timer to completion —
earliest deadline first, ties broken by scheduling order, exactly as Node
drains its timer queue. The interval is scheduled before the cancel
timeout, so an interval tick at the same deadline runs first. That
recorded transcript is the judged answer shown as `Output` below. Real
elapsed time has no influence on anything. Call fn immediately, then use
the timer APIs for later calls and cancellation; do not synchronously
simulate future ticks.

### Example 1

```text
Input: fn = (a, b) => a - b, args = [10, 3], t = 40
cancelTimeMs = 150
Output:
[
   {"time": 0, "returned": 7},
   {"time": 40, "returned": 7},
   {"time": 80, "returned": 7},
   {"time": 120, "returned": 7}
]
Explanation: fn(10, 3) runs at once (time 0) and returns 7, then repeats
every 40ms. The cancel lands at 150ms, after the 120ms tick, so exactly
four executions are recorded.
```

### Example 2

```text
Input: fn = (w) => w.toUpperCase(), args = ["ok"], t = 60
cancelTimeMs = 210
Output:
[
   {"time": 0, "returned": "OK"},
   {"time": 60, "returned": "OK"},
   {"time": 120, "returned": "OK"},
   {"time": 180, "returned": "OK"}
]
Explanation: Every execution uppercases the same argument. Ticks fall at
0, 60, 120 and 180ms; the next would be due at 240ms, but the 210ms
cancel ends the schedule first.
```

### Example 3

```text
Input: fn = (n) => n % 5, args = [17], t = 30
cancelTimeMs = 55
Output:
[
   {"time": 0, "returned": 2},
   {"time": 30, "returned": 2}
]
Explanation: Only two executions fit before the 55ms cancel: the
immediate one and the 30ms tick. The 60ms tick never happens.
```

### Constraints

- fn is a function
- args is a valid JSON array
- 1 <= args.length <= 10
- 30 <= t <= 100
- 10 <= cancelTimeMs <= 500
