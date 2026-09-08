# Unmask the Hidden Word

## Description

This is an **interactive** problem.

A list of distinct strings sits before you, every one six letters long:
that is `wordlist`, and one of its words has been chosen as the hidden
word. Your job is to name it, using nothing but the replies of the
`Interrogator` object handed to your method:

- `guess(word)` — returns how many positions `word` and the hidden word
  share (same letter, same position; between 0 and 6). Submit a word
  you are still considering.

At most **10 guesses** are allowed — the interrogator's budget; an
eleventh call is refused. The case passes when the hidden word itself is
submitted within that budget. `unmaskWord` returns nothing: the verdict
comes from the interrogator's own record of whether the hidden word was
named.

**Note (CoderPuzzle):** the wordlist reaches your method alongside the
interrogator, and the hidden word is guaranteed to be one of the listed
words — the puzzle is only ever about narrowing, never about inventing.

### Example 1

```text
Input: wordlist = ["copper","cobalt","crayon","candle"], secret = "crayon"
Output: The hidden word was named within the budget.
Explanation: Guessing "candle" answers 1 — only the leading c matches —
and exactly two candidates agree with "candle" in one position:
"copper" and "crayon". Guessing "copper" answers 1 again and leaves
"crayon" alone; naming it answers 6 and ends the search after three of
the ten guesses.
```

### Example 2

```text
Input: wordlist = ["floral","flagon"], secret = "floral"
Output: The hidden word was named within the budget.
Explanation: The first guess either answers 6 — the word itself — or
answers 2, which only the other word can do. Two guesses always suffice.
```

### Constraints

- `1 <= wordlist.length <= 100`
- Each word in the list has exactly 6 letters, all lowercase English.
- No two words in `wordlist` match.
- The hidden word is a member of `wordlist`.
- The interrogator allows at most 10 `guess` calls.

## Hints

### Hint 1

One answer can wipe out most of the list at once: if `guess(w)` replies
`k`, then only candidates agreeing with `w` in exactly `k` positions can
still be the hidden word — the word itself has to pass that test, so the
filter can never discard the answer.

### Hint 2

Guessing at random is weak when few pairs share letters: nearly every
reply is 0 and the pool barely shrinks. Spend each guess where the
_largest_ surviving group is smallest — for every candidate, split the
pool into buckets by agreement count with it, and take the candidate
whose biggest bucket is minimal.

### Hint 3

Repeat pick → guess → keep the matching bucket until a reply of 6
arrives (the word itself). Ten rounds of shrinking-by-the-worst-bucket
cover every list of this size, including the adversarial one whose words
pairwise agree in zero positions.
