# The Day After

## Description

Given a calendar date, produce the calendar date exactly one day later.
The input is a `"YYYY-MM-DD"` string and the return value is the next
day rendered in exactly the same format, with every field zero-padded
to its fixed width.

**Note (CoderPuzzle):** on LeetCode this problem is offered in JavaScript and
TypeScript only, and there the submission keeps that original shape —
add `dayAfter()` to `Date.prototype` (TypeScript merges the method into
the global `Date` interface), then declare `dayAfter(date)`, which
constructs `new Date(date)` after the enhancement has run and invokes
the newly added method on that object, so the judge's typed argument
passes through the same enhancement. In the other languages the same
step is simply the body of the plain function: take the `"YYYY-MM-DD"`
string and return the formatted next day.

### Example 1

```text
Input: date = "2026-08-01"
Output: "2026-08-02"
Explanation:
const date = new Date("2026-08-01");
date.dayAfter(); // "2026-08-02"
```

### Example 2

```text
Input: date = "2024-01-31"
Output: "2024-02-01"
Explanation: January has 31 days, so stepping past its last day rolls
both the month and the day-of-month over: February 1st, 2024.
```

### Example 3

```text
Input: date = "2000-02-29"
Output: "2000-03-01"
Explanation: 2000 is a leap year — divisible by 400 — so February 29th
exists, and the day after it is March 1st. The year is unchanged.
```

### Example 4

```text
Input: date = "1996-07-01"
Output: "1996-07-02"
Explanation: No field boundary is crossed; only the day-of-month
increments, from 01 to 02.
```

### Constraints

- `date` is a `"YYYY-MM-DD"` calendar string
- `new Date(date)` is a valid date object

## Hints

### Hint 1

`new Date("YYYY-MM-DD")` parses as UTC midnight, so the UTC getters and
setters are the safe ones — local-time accessors can print the previous
day depending on the host's time zone.

### Hint 2

Let the engine do the calendar work: advancing the parsed date by one
day normalizes month lengths, leap years, and the year boundary for
you, and the standard ISO rendering is already zero-padded.
