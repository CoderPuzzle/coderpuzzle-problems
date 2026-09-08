# Stepping Through A Date Range

## Description

Given a start date, an end date, and a positive day step, walk the
calendar from start to end inclusive and produce every date the walk
lands on: the first date, then the date one step later, and so on. A
date that would land beyond the end is not produced. Every produced
date is the calendar day itself, written `"YYYY-MM-DD"`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function
`dateStepper(start, end, step)` that yields one date string per step,
and declares a class `Solution` whose `run(dateStepCase)` hands that
function to the bundle-provided case carrier:
`dateStepCase.drive(dateStepper)`. The carrier calls the generator with
this case's `start`, `end`, and `step`, advances the returned generator
by repeated `.next()` calls until it reports done, and the judge
compares the array of collected `.value` strings — the yielded dates in
yield order — against the expected list exactly. The generator object
itself never crosses the wire; only its yielded strings are judged.

### Example 1

```text
Input: start = "2024-01-28", end = "2024-02-02", step = 2
Output: ["2024-01-28","2024-01-30","2024-02-01"]
Explanation:
const g = dateStepper(start, end, step);
g.next().value // '2024-01-28'
g.next().value // '2024-01-30'
g.next().value // '2024-02-01'

Two days later would be 2024-02-03, which is past the end, so the walk
stops after three dates. The leap-year February lets the step cross the
month boundary in a two-day hop.
```

### Example 2

```text
Input: start = "2025-11-29", end = "2025-12-05", step = 3
Output: ["2025-11-29","2025-12-02","2025-12-05"]
Explanation:
const g = dateStepper(start, end, step);
g.next().value // '2025-11-29'
g.next().value // '2025-12-02'
g.next().value // '2025-12-05'

The last landing hits the end exactly and is still produced — the range
is inclusive on both ends, and here the walk crosses into December.
```

### Example 3

```text
Input: start = "2024-06-15", end = "2024-06-15", step = 1000
Output: ["2024-06-15"]
Explanation:
const g = dateStepper(start, end, step);
g.next().value // '2024-06-15'

Start and end coincide, so the single starting date is produced no
matter how large the step is.
```

### Constraints

- new Date(start) <= new Date(end)
- start and end dates are in the string format YYYY-MM-DD
- 0 <= The difference in days between the start date and the end date <= 1500
- 1 <= step <= 1000
