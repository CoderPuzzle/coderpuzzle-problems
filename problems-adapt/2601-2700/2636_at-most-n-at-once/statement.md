# At Most N At Once

## Description

Given an array of asynchronous functions `functions` and a pool limit `n`,
write `promisePool(functions, n)` — an asynchronous run whose returned
promise settles only after every input function has.

The pool limit caps how many promises may be pending simultaneously.
`promisePool` starts as many functions as the cap allows and keeps
launching new ones the moment older promises settle, always consuming
`functions`, then `functions[i + 1]`, then `functions[i + 2]`, and so on in
strict order. The returned promise resolves once the last pending promise
does, and it may resolve to any value.

With `n = 1` the functions run strictly one after another; with `n = 2`
two run together, and as soon as either finishes the next one starts.

You may assume none of the functions ever rejects.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers. Your submission defines `promisePool(functions, n)` and declares a
class `Solution` whose `run(driver)` hands that function over with
`return driver.drive(promisePool)`. On the virtual clock each case's
function i is an async job with one parameter, its delay d_i: calling it
starts the job immediately and its promise settles at start + d_i, and at
most n jobs may be pending at once — when slots free up, they are filled
greedily in index order across simultaneous settlements too, so every
start and end tick is fully determined. The driver records both ticks for
every function and compares them exactly: `[starts[], ends[]]`. Settling
promise values are ignored (`null` settles everywhere); only the schedule
is judged.

### Example 1

```text
Input:
functions = [sleep 200, sleep 100, sleep 350]
n = 2
Output: [[0,0,100],[200,100,450]]
Explanation:
At tick 0 the first two jobs start; the cap of 2 is full.
The 100 ms job settles at tick 100 and its slot is refilled immediately by
the third job, which starts at 100 and settles at 100 + 350 = 450.
The 200 ms job settles at tick 200. The last settlement lands at 450, so
the returned promise resolves there.
```

### Example 2

```text
Input:
functions = [sleep 250, sleep 450, sleep 150]
n = 5
Output: [[0,0,0],[250,450,150]]
Explanation:
The limit of 5 is never reached — all three jobs start at tick 0.
They settle at 250, 450, and 150 respectively, so the returned promise
resolves at the last of those, tick 450.
```

### Example 3

```text
Input:
functions = [sleep 120, sleep 240, sleep 90]
n = 1
Output: [[0,120,360],[120,360,450]]
Explanation:
With a pool of one, the jobs run strictly in series: each starts exactly
when its predecessor settles — 120, then 360 — and the final job settles
at 450, resolving the returned promise.
```

### Constraints

- `0 <= functions.length <= 10`
- `1 <= n <= 10`

## Hints

### Hint 1

Start by launching functions until the pool fills up.

### Hint 2

Whenever a running function settles, launch the next queued one if any
remains.
