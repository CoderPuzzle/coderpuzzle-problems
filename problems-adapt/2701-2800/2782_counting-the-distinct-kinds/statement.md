# Counting The Distinct Kinds

## Description

This is an **interactive** problem.

You are handed an integer `n` and a `kindOracle` object of class
`KindOracle`. Behind it live `n` elements, numbered `0` through `n - 1`,
and every element carries exactly one kind. The assignment itself is
hidden; the only way in is through the oracle's single method:

- `boolean hasSameKind(integer a, integer b)` — answers whether
  elements `a` and `b` carry the same kind. An argument outside
  `0 .. n - 1` never crashes the oracle: it simply answers false.

Report how many distinct kinds the `n` elements hold.

**Note (CoderPuzzle):** the signature is `numberOfCategories(kindOracle, n)`;
the oracle arrives as the first argument handed to your method, and
every `hasSameKind` call spends one unit of an ample budget of
10 000 queries. Kind labels are arbitrary — two inputs whose partitions
agree always give the same answer.

### Example 1

```text
Input: kinds = [4, 7, 4, 9, 7, 4], n = 6
Output: 3
Explanation: Elements 0, 2, and 5 share one kind, elements 1 and 4
share a second, and element 3 is alone in a third. The labels 4, 7, and
9 themselves are irrelevant — only which elements agree matters.
```

### Example 2

```text
Input: kinds = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3], n = 10
Output: 7
Explanation: The distinct kinds are the ones first seen at positions 0
through 6 — positions 3, 8, and 9 each repeat an earlier kind — so the
answer is 7.
```

### Example 3

```text
Input: kinds = [8, 8, 8, 8], n = 4
Output: 1
Explanation: Every element carries the same kind, so a single kind
covers all four elements.
```

### Constraints

- `n == number of elements`
- `1 <= n <= 100`

## Hints

### Hint 1

Carrying the same kind is an equivalence relation: it is reflexive,
symmetric, and transitive. That means each kind needs only one known
member — a representative — to identify every other member of it.

### Hint 2

Sweep the elements in ascending order. For each element `i`, put it to
the oracle against the representatives collected so far.

### Hint 3

If any representative of `i` answers true, `i` joins an already-counted
kind and nothing changes. Otherwise `i` founds a brand-new kind, joins
the representative list, and the count rises by one.
