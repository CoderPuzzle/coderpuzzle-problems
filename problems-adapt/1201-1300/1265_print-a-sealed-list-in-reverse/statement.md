# Print a Sealed List in Reverse

## Description

You hold the head of a sealed linked list — one whose nodes can neither be
inspected directly nor modified — and must report every value from last to
first using only its two-method interface:

- `SealedListNode.emitValue()`: reports the value held by the current node.
- `SealedListNode.successor()`: returns the next node of the list.

The head arrives as the `SealedListNode` handed to your method, so a call
reads `head.emitValue()` / `head.successor()` (`successor()` returns
`null`/`nil`/`None` past the end of the list). The list is given to you
only to initialize the structure internally — you must work through the
interface alone, without modifying the list, and produce the values in
reverse order.

**Note (CoderPuzzle):** instead of printing to stdout, call `emitValue()` on
each node in the order the values should be printed — every call is
recorded and the recorded sequence is what the judge compares. Implement
`emitListInReverse(head)`.

### Example 1

```text
Input: head = [1,2,3,4]
Output: [4,3,2,1]
```

### Example 2

```text
Input: head = [0,-4,-1,3,-5]
Output: [-5,3,-1,-4,0]
```

### Example 3

```text
Input: head = [-2,0,6,4,4,-6]
Output: [-6,4,4,6,0,-2]
```

### Constraints

- The number of nodes in the list is in the range `[1, 2000]`.
- `0 <= Node.val <= 2000`
- The list is sealed: its nodes expose only the two methods above, and
  neither of them may be used to modify the structure.

## Hints

### Hint 1

`successor()` only moves forward, so think about how to reach the end of
the list first — a stack of traversed nodes works, and so does recursion.

### Hint 2

If extra memory is off the table, a list that only seals its values can
still be reversed with a quadratic-time approach; ask what the optimal
space cost is.
