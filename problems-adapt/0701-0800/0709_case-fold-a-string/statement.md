# Case-Fold a String

## Description

Given a string `s`, return a copy of it with every uppercase letter
replaced by its lowercase counterpart. Characters that are already
lowercase, digits, punctuation, or anything else that has no case stay
exactly as they are.

### Example 1

```text
Input: s = "CoderPuzzle"
Output: "coderpuzzle"
```

### Example 2

```text
Input: s = "quiet"
Output: "quiet"
```

### Example 3

```text
Input: s = "JUDGE-2024!"
Output: "judge-2024!"
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of printable ASCII characters.

## Hints

### Hint 1

Most languages already ship a built-in that lowercases a string, but
using it defeats the point of the exercise — think about how you would
implement that conversion yourself, character by character.

### Hint 2

The answer lives in the character encoding, not in a lookup table.

### Hint 3

Every uppercase letter and its lowercase twin sit a fixed distance
apart in ASCII. Once you know that distance, and which range of codes
counts as "uppercase," the conversion is one comparison and one
addition.
