# Cancelling A Deferred Call

## Description

Given a function `fn`, an array of arguments `args`, and a delay `t` in
milliseconds, write a function `deferrable(fn, args, t)` that postpones
the call and returns a cancel function `cancelFn`.

Calling `fn` is put off by `t` milliseconds. When it does run, it receives
exactly the values in `args`. The returned `cancelFn` is scheduled by the
harness at `cancelTimeMs`; if it fires before `t` has elapsed, the pending
call is cancelled and `fn` never runs — otherwise `fn` executes on schedule
and the late cancel changes nothing.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — there are no other languages for it. It is also judged on a
deterministic virtual clock instead of real timers: your submission
declares `function deferrable(fn, args, t)` plus a class `Solution` whose
`run` method hands your function to the bundle-provided driver:
`deferralCase.drive(deferrable)`. During `drive` the driver replaces the
global `setTimeout`/`clearTimeout` with virtual-clock equivalents,
constructs your `deferrable(fn, args, t)` (fn records the transcript:
every actual execution pushes one row `{"time": <virtual execution time>,
"returned": <the value fn returned>}`), schedules the returned cancelFn at
the case's `cancelTimeMs`, then drains every scheduled timer to completion
— earliest deadline first, ties broken by scheduling order, exactly as
Node drains its timer queue. That recorded transcript is the judged answer
shown as `Output` below. Real elapsed time has no influence on anything.
Never bypass the timers (no setImmediate or synchronous invocation) — only
executions scheduled through setTimeout and cancelled through
clearTimeout count. Invoking cancelFn more than once, or after fn already
ran, must be harmless: a cancelled-or-fired timer is gone.

### Example 1

```text
Input: fn = (x, y) => x + y * 2, args = [3, 4], t = 40
cancelTimeMs = 90
Output: [{"time": 40, "returned": 11}]
Explanation: The cancel was scheduled for 90ms, after the deferred call
fired at 40ms — so the transcript holds the one execution of fn(3, 4).
```

### Example 2

```text
Input: fn = (w) => w.toUpperCase(), args = ["hush"], t = 120
cancelTimeMs = 60
Output: []
Explanation: The cancel fired at 60ms, before the 120ms delay elapsed, so
fn never ran and the transcript is empty.
```

### Example 3

```text
Input: fn = (xs) => xs.filter(v => v > 0).length, args = [[-2, 5, 0, 9]], t = 75
cancelTimeMs = 175
Output: [{"time": 75, "returned": 2}]
Explanation: Nothing cancelled the call, so it ran at 75ms over the
supplied array and recorded its result.
```

### Constraints

- `fn` is a function
- `args` is a valid JSON array
- `1 <= args.length <= 10`
- `20 <= t <= 1000`
- `10 <= cancelTimeMs <= 1000`
